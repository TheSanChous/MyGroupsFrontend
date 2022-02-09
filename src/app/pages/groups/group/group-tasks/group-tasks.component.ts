import {Component, Input, OnInit, Output} from '@angular/core';
import {GroupService} from "../../../../../api/groups/group.service";
import {GroupModel} from "../../../../../models/group/GroupModel";
import {TaskService} from "../../../../../api/tasks/task.service";
import {TaskModel} from "../../../../../models/task/TaskModel";
import {MatDialog} from "@angular/material/dialog";
import {CreateTaskComponent} from "../../../../components/create-task/create-task.component";
import {MatSnackBar} from "@angular/material/snack-bar";;
import {QuestionDialogComponent} from "../../../../components/dialogs/question-dialog/question-dialog.component";

@Component({
  selector: 'app-group-tasks',
  templateUrl: './group-tasks.component.html',
  styleUrls: ['./group-tasks.component.css']
})
export class GroupTasksComponent implements OnInit {

  @Input()
  groupId!: string;

  @Input()
  selectTaskId!: string;

  group!: GroupModel;

  tasks!: TaskModel[];

  selectedTask!: TaskModel | null;

  role!: string;

  constructor(private readonly groupService: GroupService,
              private readonly taskService: TaskService,
              private readonly dialog: MatDialog,
              private readonly snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadGroup();
    this.loadTasks();
    this.loadRole();
  }

  private loadTasks() {
    console.log("load tasks");
    this.groupService.getTasks(this.groupId)
      .subscribe((tasks) => {
        this.tasks = tasks;
        if(this.selectTaskId != null) {
          this.selectedTask = this.tasks.find(task => task.id == this.selectTaskId) ?? null;
          console.log(this.selectTaskId);
        }
      }, error => {
        console.log(error);
        let errors = error.errors.join(', ')
        this.snackbar.open(errors, "Ok", {
          duration: 3000
        });
      });
  }

  private loadGroup() {
    this.groupService.getGroup(this.groupId)
      .subscribe(group => {
        this.group = group;
      })
  }

  createTaskClick() {
    this.dialog.open(CreateTaskComponent, {
      panelClass: [
        "col-9"
      ],
      data: {
        groupId: this.group.id
      }
    }).afterClosed()
      .subscribe(() => {
        this.loadTasks();
      });
  }

  private loadRole() {
    this.groupService.getRole(this.groupId)
      .subscribe((role) => {
        this.role = role;
      });
  }

  deleteTaskClick(taskId: string) {
    this.dialog.open(QuestionDialogComponent, {
      data: {
        text: "Are you sure to delete task?"
      }
    }).afterClosed()
      .subscribe((res) => {
        if(res) {
          this.taskService.deleteTask(taskId)
            .subscribe((res: any) => {
              this.selectedTask = null;
              this.loadTasks();
            }, (error: any)=> {
              let errors = error.error.join(', ');
              this.snackbar.open(errors, "Ok", {
                duration: 3000
              });
            });
        }
      });
  }
}
