import {Component, Input, OnInit} from '@angular/core';
import {TaskModel} from "../../../../../../models/task/TaskModel";
import {TaskService} from "../../../../../../api/tasks/task.service";
import {FileModel} from "../../../../../../models/file/FileModel";
import {saveAs} from "file-saver";
import * as FileSaver from "file-saver";
import {TaskDetailsModel} from "../../../../../../models/task/TaskDetailsModel";
import {NgxSpinnerService} from "ngx-spinner";
import {GroupService} from "../../../../../../api/groups/group.service";
import {CurrentGroupService} from "../../../../../../core/groups/current-group.service";
import {CreateTaskComponent} from "../../../../../components/create-task/create-task.component";
import {MatDialog} from "@angular/material/dialog";
import {
  UploadCompletedTaskComponent
} from "../../../../../components/upload-complated-task/upload-completed-task.component";
import {CompletedTaskService} from "../../../../../../api/tasks/completed-task.service";
import {CompletedTaskModel} from "../../../../../../models/task/CompletedTaskModel";
import {DatePipe} from "@angular/common";
import {EstimateComponent} from "../../../../../components/estimate/estimate.component";

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

  completedTasks: CompletedTaskModel[] = [];

  role!: string;

  constructor(private readonly taskService: TaskService,
              private readonly completedTaskService: CompletedTaskService,
              private readonly currentGroupService: CurrentGroupService,
              private readonly groupService: GroupService,
              private readonly dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadTaskDetails();
    this.loadTaskFile();
    this.loadRole();
    this.loadCompletedTasks()
  }

  private loadCompletedTasks() {
    this.completedTaskService.getForTask(this.taskId)
      .subscribe(tasks => {
         this.completedTasks = tasks;
      })
  }

  private loadRole() {
    const id = this.currentGroupService.getGroup()?.id
    this.groupService.getRole(id!)
      .subscribe((role) => {
        this.role = role;
      });
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

  uploadCompletedTaskClick() {
    this.dialog.open(UploadCompletedTaskComponent, {
      panelClass: [
        "col-9"
      ],
      data: {
        taskId: this.task.id
      }
    }).afterClosed()
      .subscribe(() => {
        this.loadCompletedTasks();
      });
  }

  estimateClick(completedTaskId: string) {
    this.dialog.open(EstimateComponent, {
      panelClass: [
        "col-9"
      ],
      data: {
        completedTaskId: completedTaskId
      }
    }).afterClosed()
      .subscribe(() => {
        this.loadCompletedTasks();
      })
  }
}
