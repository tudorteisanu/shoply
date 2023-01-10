import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import {
  RequestLoadingFinish,
  RequestLoadingStart,
} from '@/app/store/request-loading/request-loading.action';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private store: Store) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.store.dispatch(RequestLoadingStart);
    return next
      .handle(request)
      .pipe(
        catchError((err) => {
          this.store.dispatch(RequestLoadingFinish);
          return err;
        })
      )
      .pipe(
        map((evt: any) => {
          if (evt instanceof HttpResponse) {
            this.store.dispatch(RequestLoadingFinish);
          }
          return evt;
        })
      );
  }
}

export const LOADING_INTERCEPTOR_PROVIDER = {
  provide: HTTP_INTERCEPTORS,
  useClass: LoadingInterceptor,
  multi: true,
};
