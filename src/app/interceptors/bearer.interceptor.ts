import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from "@/services/auth.service";
import {TokensInterface} from "@/ts/interfaces";
import {ApiRoutes} from "@/ts/enum";

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class BearerInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authReq = request;

    if (this.auth.accessToken && !this.isRefreshing) {
      authReq = this.addTokenHeader(request, this.auth.accessToken);
    }

    return next.handle(authReq).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === HttpStatusCode.Unauthorized && request.url !== ApiRoutes.Login && !this.isRefreshing) {
        this.isRefreshing = true;

        return this.auth.refresh().pipe(
          switchMap(({accessToken}: TokensInterface) => {
            return next.handle(this.addTokenHeader(request, accessToken));
          }),
        );
      }
      this.isRefreshing = false;
      return throwError(() => err);
    }));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)});
  }
}
