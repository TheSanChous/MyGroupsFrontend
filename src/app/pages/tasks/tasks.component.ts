import { Component, OnInit } from '@angular/core';
import {TaskService} from "../../../api/tasks/task.service";
import {TaskModel} from "../../../models/task/TaskModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: TaskModel[] = []

  constructor(private readonly taskService: TaskService,
              private readonly router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks()
      .subscribe((tasks) => {
        this.tasks = tasks;
      })
  }

  openTaskClick(task: TaskModel) {
    this.router.navigateByUrl(`/group/${task.group.identifier}#taskId=${task.id}`);
  }
}
