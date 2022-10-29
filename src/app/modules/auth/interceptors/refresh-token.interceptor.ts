import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpStatusCode,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokensInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';
import { AuthStoreService } from '../services/auth-store.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  isRefreshing: boolean = false;

  constructor(private auth: AuthService, private authStore: AuthStoreService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authStore.refreshToken) {
      return next.handle(request);
    }

    return next
      .handle(request)
      .pipe(
        catchError((err: HttpErrorResponse) =>
          this.catchHttpError(err, request, next)
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
      this.authStore.setAccessToken(null);

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

export const REFRESH_TOKEN_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: RefreshTokenInterceptor,
  multi: true,
};
