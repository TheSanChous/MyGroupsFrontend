import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent, HttpResponse, HttpErrorResponse, HttpResponseBase,
} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {NgxSpinnerService} from "ngx-spinner";
import {Router} from "@angular/router";

@Injectable()
export class HttpSpinerInterceptor implements HttpSpinerInterceptor {

  constructor(private readonly spiner: NgxSpinnerService,
              private readonly router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spiner.show("main");
    return next.handle(request)
      .pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponseBase) {
            this.spiner.hide("main");
          }
        }, (error) => {
          this.spiner.hide("main");
          if(error.status == 0) {
            this.router.navigateByUrl('/error');
          }
        })
      );
  }
}
