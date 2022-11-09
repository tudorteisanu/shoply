import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseRoutingModule } from './router/base-routing.module';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/services/auth.service';
import { ErrorHandlerProvider } from '@/services/error-handler.service';
import { AlertComponent } from '@/components/layout-components/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BaseRoutingModule,
    RouterOutlet,
    AuthModule,
    AlertComponent,
  ],
  providers: [AuthService, ErrorHandlerProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
