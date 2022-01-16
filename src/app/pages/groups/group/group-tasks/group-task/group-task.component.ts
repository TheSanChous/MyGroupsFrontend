import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from "../../../../../../models/task/TaskModel";
import {TaskService} from "../../../../../../api/tasks/task.service";
import {FileModel} from "../../../../../../models/file/FileModel";
import {saveAs} from "file-saver";
import * as FileSaver from "file-saver";
import {TaskDetailsModel} from "../../../../../../models/task/TaskDetailsModel";
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-group-task',
  templateUrl: './group-task.component.html',
  styleUrls: ['./group-task.component.css']
})
export class GroupTaskComponent implements OnInit {

  @Input()
  taskId!: string;

  task!: TaskDetailsModel;

  taskFile!: FileModel | null;

  constructor(private readonly taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTaskDetails();
    this.loadTaskFile();
  }

  loadTaskFile() {
    this.taskService.getTaskFile(this.taskId)
      .subscribe((file) => {
        this.taskFile = file;
      }, error => {
        console.log(error);
      });
  }

  downloadFileClick() {
    window.open(this.taskFile?.url);
  }

  private loadTaskDetails() {
    this.taskService.getTask(this.taskId)
      .subscribe((task)=>{
        this.task = task;
      });
  }
}
