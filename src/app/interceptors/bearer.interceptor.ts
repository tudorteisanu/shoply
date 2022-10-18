import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "@/services/auth.service";

@Injectable()
export class BearerInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.auth.token) {
      return next.handle(
        request.clone({
          headers: request.headers.set(
            'Authorization',
            `Bearer ${this.auth.token}`
          ),
        })
      ).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Unauthorized) {
            this.auth.logout()
          }

          return throwError(() => error);
        })
      );
    }
    return next.handle(request);
  }
}
