import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiRoutes } from '@/ts/enum';
import {
  AUTHORIZATION_HEADER_KEY,
  AUTHORIZATION_HEADER_PREFIX,
} from '@/ts/consts';
import { Store } from '@ngxs/store';
import { SetAccessToken, SetUser } from '@/app/store/auth/auth.action';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  get accessToken(): string {
    return this.store.selectSnapshot((state) => state.auth.accessToken);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.accessToken) {
      return next
        .handle(
          request.clone({
            headers: request.headers.set(
              AUTHORIZATION_HEADER_KEY,
              `${AUTHORIZATION_HEADER_PREFIX} ${this.accessToken}`
            ),
          })
        )
        .pipe(
          catchError((err: HttpErrorResponse) => {
            if (
              err.status === HttpStatusCode.Unauthorized &&
              request.url !== ApiRoutes.Login
            ) {
              this.store.dispatch(new SetUser(null));
              this.store.dispatch(new SetAccessToken(null));
            }
            return throwError(() => err);
          })
        );
    }

    return next.handle(request);
  }
}

export const TOKEN_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true,
};
