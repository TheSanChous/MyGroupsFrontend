import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationCoreService {

  onLogout = new EventEmitter();
  onLogin = new EventEmitter();

  constructor(private readonly router: Router) { }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  saveToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string {
    return localStorage.getItem('accessToken')!;
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/login');
    this.onLogout.emit();
  }
}
