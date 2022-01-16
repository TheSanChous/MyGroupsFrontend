import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {UserModel} from "../models/user/UserModel";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: string = environment.apiUrl + 'Account/';

  constructor(private readonly http: HttpClient) { }

  getUserInfo(): Observable<UserModel> {
    return this.http.get<UserModel>(this.apiUrl);
  }


}
