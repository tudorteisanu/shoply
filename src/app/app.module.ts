import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BaseRoutingModule} from './router/base-routing.module';
import {RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseUrlInterceptor} from "./interceptors/base-url.interceptor";
import {AuthService} from "./services/auth.service";
import {UserInterface} from "@/ts/interfaces";
import {BearerInterceptor} from "./interceptors/bearer.interceptor";

function initializeAppFactory(authService: AuthService): () => void {
  return () => {
    if (authService.accessToken) {
      authService.getUserInfo().subscribe({
        next: (user: UserInterface) => {
          authService.user = user;
        }
      })
    }
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaseRoutingModule, RouterOutlet, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BearerInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeAppFactory,
      deps: [AuthService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
