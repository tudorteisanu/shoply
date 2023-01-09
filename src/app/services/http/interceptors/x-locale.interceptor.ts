import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { I18nService } from '@/app/plugins/i18n.service';

const X_LOCALE_HEADER_KEY = 'x-locale';

@Injectable()
export class XLocaleInterceptor implements HttpInterceptor {
  constructor(private i18n: I18nService) {}

  get currentLang(): string {
    return this.i18n.currentLang;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.currentLang) {
      return next.handle(
        request.clone({
          setHeaders: {
            [X_LOCALE_HEADER_KEY]: this.currentLang,
          },
        })
      );
    }
    return next.handle(request);
  }
}

export const X_LOCALE_INTERCEPTOR = {
  provide: HTTP_INTERCEPTORS,
  useClass: XLocaleInterceptor,
  multi: true,
};
