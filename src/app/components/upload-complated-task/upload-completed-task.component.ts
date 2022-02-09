import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, Validators} from "@angular/forms";
import {TaskService} from "../../../api/tasks/task.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CompletedTaskService} from "../../../api/tasks/completed-task.service";

@Component({
  selector: 'app-upload-complated-task',
  templateUrl: './upload-completed-task.component.html',
  styleUrls: ['./upload-completed-task.component.css']
})
export class UploadCompletedTaskComponent implements OnInit {

  description = new FormControl('', Validators.compose([Validators.required ,Validators.minLength(5)]));
  @ViewChild('fileInput') fileInput!: ElementRef;
  fileAttr = 'Choose File';
  file!: File;

  constructor(public dialog: MatDialogRef<UploadCompletedTaskComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private taskService: TaskService,
              private completedTaskService: CompletedTaskService,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {

  }

  uploadTaskClick() {
    const task = {
      TaskId: this.data.taskId,
      Description: this.description.value
    };
    this.completedTaskService.uploadTask(task)
      .subscribe((task: any) => {
        if(this.file == null) {
          this.dialog.close();
          return;
        }
        this.uploadCompletedTaskFile(task.taskId);
      }, error => {
        let errors = error.error.join(', ')
        this.snackbar.open(errors, "Ok", {
          duration: 3000
        });
      });
  }

  uploadCompletedTaskFile(taskId: string) {
    let formData = new FormData();
    formData.append('file', this.file, this.file.name);
    this.completedTaskService.uploadTaskFile(taskId, formData)
      .subscribe(() => {
        this.dialog.close();
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
