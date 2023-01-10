import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BaseRoutingModule } from './router/base-routing.module';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@/services/auth.service';
import { ERROR_HANDLER_PROVIDER } from '@/services/error-handler.service';
import { AlertComponent } from '@/components/layout-components/alert/alert.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TOKEN_INTERCEPTOR_PROVIDER } from '@/services/http/interceptors/token.interceptor';
import { BASE_URL_INTERCEPTOR_PROVIDER } from '@/services/http/interceptors/base-url.interceptor';
import { APP_INITIALIZER_PROVIDER } from '@/app/app.initializer';
import { REFRESH_TOKEN_INTERCEPTOR_PROVIDER } from '@/services/http/interceptors/refresh-token.interceptor';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LayoutComponentsModule } from '@/components/layout-components/layout-components.module';
import { StoreModule } from '@/app/store/store.module';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { Locales } from '@/ts/enum';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, `./assets/locales/`);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: Locales.En,
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    BrowserModule,
    BrowserAnimationsModule,
    BaseRoutingModule,
    RouterOutlet,
    AlertComponent,
    HttpClientModule,
    LayoutComponentsModule,
    StoreModule,
  ],
  providers: [
    AuthService,
    ERROR_HANDLER_PROVIDER,
    TOKEN_INTERCEPTOR_PROVIDER,
    BASE_URL_INTERCEPTOR_PROVIDER,
    APP_INITIALIZER_PROVIDER,
    REFRESH_TOKEN_INTERCEPTOR_PROVIDER,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
