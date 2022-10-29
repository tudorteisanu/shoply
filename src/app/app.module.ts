import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseRoutingModule } from './router/base-routing.module';
import { RouterOutlet } from '@angular/router';
import { AuthModule } from './plugins/auth/auth.module';
import { AuthService } from './plugins/auth/auth.service';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaseRoutingModule, RouterOutlet, AuthModule],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
