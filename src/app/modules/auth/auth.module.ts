import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER_PROVIDER } from './app.initializer';
import { TOKEN_INTERCEPTOR_PROVIDER } from './interceptors/token.interceptor';
import { BASE_URL_INTERCEPTOR_PROVIDER } from '@/app/modules/auth/interceptors/base-url.interceptor';
import { REFRESH_TOKEN_INTERCEPTOR_PROVIDER } from '@/app/modules/auth/interceptors/refresh-token.interceptor';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [
    TOKEN_INTERCEPTOR_PROVIDER,
    BASE_URL_INTERCEPTOR_PROVIDER,
    APP_INITIALIZER_PROVIDER,
    REFRESH_TOKEN_INTERCEPTOR_PROVIDER,
  ],
})
export class AuthModule {}
