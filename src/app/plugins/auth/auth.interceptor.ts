import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { TokensInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';
import { environment } from '../../../environments/environment';
import { AuthStoreService } from './auth-store.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;

  constructor(private auth: AuthService, private authStore: AuthStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let authReq = request;

    if (!authReq.url.startsWith('http')) {
      authReq = authReq.clone({
        url: `${environment.apiUrl}${authReq.url}`,
      });
    }

    if (this.authStore.accessToken && !this.isRefreshing) {
      authReq = this.addTokenHeader(authReq, this.authStore.accessToken);
    }

    return next
      .handle(authReq)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.catchHttpError(err, authReq, next)
        )
      );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`),
    });
  }

  private catchHttpError(
    err: HttpErrorResponse,
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (
      err.status === HttpStatusCode.Unauthorized &&
      request.url !== ApiRoutes.Login &&
      !this.isRefreshing
    ) {
      this.isRefreshing = true;

      return this.auth.refresh().pipe(
        switchMap(({ accessToken }: TokensInterface) => {
          this.isRefreshing = false;
          return next.handle(this.addTokenHeader(request, accessToken));
        })
      );
    }

    return throwError(() => err);
  }
}
