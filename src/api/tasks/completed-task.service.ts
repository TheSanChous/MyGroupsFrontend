import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {CreateTaskModel} from "../../models/task/CreateTaskModel";
import {map, Observable, tap} from "rxjs";
import {CreateCompletedTaskModel} from "../../models/task/CreateCompletedTaskModel";
import {CompletedTaskModel} from "../../models/task/CompletedTaskModel";
import {TimeConverter} from "../../core/time/TimeConverter";
import {formatDate} from "@angular/common";
import {EstimateTaskModel} from "../../models/task/EstimateTaskModel";
import {GradeModel} from "../../models/task/GradeModel";

@Injectable({
  providedIn: 'root'
})
export class CompletedTaskService {

  apiUrl = environment.apiUrl + 'CompletedTask/';

  constructor(private http: HttpClient) { }

  uploadTask(task: CreateCompletedTaskModel): Observable<string> {
    return this.http.post<string>(this.apiUrl, task);
  }

  uploadTaskFile(completedTaskId: string, file: any): Observable<string> {
    return this.http.post<string>(this.apiUrl + completedTaskId + '/file', file);
  }

  estimateTask(grade: EstimateTaskModel): Observable<any> {
    return this.http.post(this.apiUrl + 'grade/', grade);
  }

  getGrade(completedTaskId: string): Observable<GradeModel> {
    return this.http.get<GradeModel>(this.apiUrl + `${completedTaskId}/grade/`);
  }

  getForTask(taskId: string): Observable<CompletedTaskModel[]> {
    return this.http.get<CompletedTaskModel[]>(this.apiUrl + 'task/' + taskId)
      .pipe(tap(task => task.forEach(task => task.uploadedAt = TimeConverter.convertFromUTCToLocalTime(task.uploadedAt))));
  }
}
