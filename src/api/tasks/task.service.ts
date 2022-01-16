import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CreateTaskModel} from "../../models/task/CreateTaskModel";
import {map, Observable, tap} from "rxjs";
import {TaskModel} from "../../models/task/TaskModel";
import {FileModel} from "../../models/file/FileModel";
import {TaskDetailsModel} from "../../models/task/TaskDetailsModel";
import {TimeConverter} from "../../core/time/TimeConverter";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private readonly apiUrl = environment.apiUrl + 'Task/';

  constructor(private readonly http: HttpClient) { }

  createTask(task: CreateTaskModel): Observable<string> {
    return this.http.post<string>(this.apiUrl, task);
  }

  uploadTaskFile(taskId: string, file: FormData): Observable<{}> {
    return this.http.post(this.apiUrl + `${taskId}/file`, file);
  }

  getTask(taskId: string): Observable<TaskDetailsModel> {
    return this.http.get<TaskDetailsModel>(this.apiUrl + `${taskId}`)
      .pipe(map((task) => (
        {...task,
          deadline: TimeConverter.convertFromUTCToLocalTime(task.deadline),
          publishedAt: TimeConverter.convertFromUTCToLocalTime(task.publishedAt)
        })));
  }

  deleteTask(taskId: string): Observable<{}> {
    return this.http.delete(this.apiUrl + `${taskId}`);
  }

  getTaskFile(taskId: string): Observable<FileModel> {
    return this.http.get<FileModel>(this.apiUrl + `${taskId}/file`);
  }
}
