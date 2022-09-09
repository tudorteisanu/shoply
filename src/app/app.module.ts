import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseRoutingModule } from './router/base-routing.module';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BaseRoutingModule, RouterOutlet],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
