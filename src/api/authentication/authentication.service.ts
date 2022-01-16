import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {LoginModel} from "../../models/authentication/LoginModel";
import {Observable} from "rxjs";
import {RegistrationModel} from "../../models/authentication/RegistrationModel";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly apiAuthUrl: string = environment.apiUrl + 'Auth';

  constructor(private readonly httpClient: HttpClient) { }

  login(loginModel: LoginModel): Observable<any> {
    return this.httpClient.post(this.apiAuthUrl + '/login', loginModel);
  }

  registration(registrationModel: RegistrationModel): Observable<any> {
    return  this.httpClient.post(this.apiAuthUrl + '/register', registrationModel);
  }
}
