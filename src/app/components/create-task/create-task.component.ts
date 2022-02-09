import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../../api/tasks/task.service";
import {CurrentGroupService} from "../../../core/groups/current-group.service";
import {MatDialog, MatDialogClose} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatFileUploadComponent} from "angular-material-fileupload";
import {
  MatFileUploadQueueService
} from "angular-material-fileupload/lib/mat-file-upload-queue/mat-file-upload-queue.service";
import {MatDatepickerInput} from "@angular/material/datepicker";

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  title = new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)]));
  description = new FormControl('');

  deadline = new FormControl(null, Validators.required);

  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';

  deadlinePickerOptions = {
    min: new Date()
  }

  file!: File;

  constructor(private readonly taskService: TaskService,
              private readonly currentGroup: CurrentGroupService,
              private readonly dialog: MatDialog,
              private readonly snackbar: MatSnackBar) { }

  ngOnInit(): void {

  }

  uploadTaskFile(taskId: string) {
    let formData = new FormData();
    formData.append('file', this.file, this.file.name);

    this.taskService.uploadTaskFile(taskId, formData)
      .subscribe(() => {
        this.dialog.closeAll();
      }, error => {
        let errors = error.error.join(', ')
        this.snackbar.open(errors, "Ok", {
          duration: 3000
        });
      });
  }

  createTaskClick() {
    const task = {
      groupId: this.currentGroup.getGroup()?.id!,
      title: this.title.value,
      description: this.description.value,
      deadline: this.deadline.value.toISOString(),
    };
    this.taskService.createTask(task)
      .subscribe((taskId) => {
      if(this.file == null) {
        this.dialog.closeAll();
        return;
      }
      this.uploadTaskFile(taskId);
    }, error => {
      let errors = error.error.join(', ')
      this.snackbar.open(errors, "Ok", {
        duration: 3000
      });
    });
  }

  uploadFileEventHandler(file: any) {
    if (file.target.files && file.target.files[0]) {
      this.fileAttr = file.target.files[0].name;
      this.file = file.target.files[0];
    }
  }
}
