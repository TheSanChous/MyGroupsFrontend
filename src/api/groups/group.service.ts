import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {GroupModel} from "../../models/group/GroupModel";
import {CreateGroupModel} from "../../models/group/CreateGroupModel";
import {GroupUsersListModel} from "../../models/group/GroupUsersListModel";
import {GroupUserModel} from "../../models/user/GroupUserModel";
import {TaskModel} from "../../models/task/TaskModel";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private readonly apiGroupUrl = environment.apiUrl + 'Group/';

  constructor(private readonly httpClient: HttpClient) { }

  getGroups(): Observable<GroupModel[]> {
    return this.httpClient.get(this.apiGroupUrl)
      .pipe(map((group:any) => group.groups));
  }

  getGroup(id: string): Observable<GroupModel> {
    return this.httpClient.get<GroupModel>(this.apiGroupUrl + `${id}`);
  }

  getGroupByIdentifier(id: string): Observable<GroupModel> {
    return this.httpClient.get<GroupModel>(this.apiGroupUrl + `identifier/${id}`);
  }

  createGroup(createGroup: CreateGroupModel): Observable<string> {
    return  this.httpClient.post(this.apiGroupUrl, createGroup)
      .pipe(map((result: any) => result.identifier));
  }

  joinGroup(groupId: string): Observable<{}> {
    return this.httpClient.get(this.apiGroupUrl + `${groupId}/join`);
  }

  leaveGroup(groupId: string): Observable<{}> {
    return this.httpClient.get(this.apiGroupUrl + `${groupId}/leave`);
  }

  getMembers(groupId: string): Observable<GroupUserModel[]> {
    return this.httpClient.get<GroupUsersListModel>(this.apiGroupUrl + `${groupId}/members`)
      .pipe(map((groupUserList) => groupUserList.groupUsersList));
  }

  getRole(groupId: string): Observable<string> {
    return this.httpClient.get<string>(this.apiGroupUrl + `${groupId}/role`)
      .pipe(map((role: any) => role.role));
  }

  getTasks(groupId: string): Observable<TaskModel[]> {
    return this.httpClient.get<TaskModel[]>(this.apiGroupUrl + `${groupId}/tasks`);
  }
}
