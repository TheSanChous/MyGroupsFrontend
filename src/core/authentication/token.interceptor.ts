import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {catchError, Observable, of, tap} from 'rxjs';
import {AuthenticationCoreService} from "./authenticationCore.service";
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private readonly authenticationService: AuthenticationCoreService,
              private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if(!this.authenticationService.isAuthenticated()) {
      return next.handle(request);
    }

    const token = this.authenticationService.getToken();

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authenticationService.getToken()}`
      }
    })

    return next.handle(request)
      .pipe(tap(() => {},
        (err: any) => {
          if(err instanceof HttpErrorResponse) {
            if(err.status !== 401){
              return;
            }
            this.router.navigateByUrl('/login');
          }
        }));
  }
}
