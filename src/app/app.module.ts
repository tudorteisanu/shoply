import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BaseRoutingModule} from './router/base-routing.module';
import {RouterOutlet} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BaseUrlInterceptor} from "./interceptors/base-url.interceptor";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaseRoutingModule, RouterOutlet, HttpClientModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BaseUrlInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
