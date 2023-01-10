import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { LoadingComponent } from './loading/loading.component';
import { BaseModule } from '@/components/base/base.module';
import { LanguageSwitcherComponent } from './language-switcher/language-switcher.component';
import { TranslateModule } from '@ngx-translate/core';
import { RequestLoaderComponent } from './request-loader/request-loader.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileMenuComponent,
    LoadingComponent,
    LanguageSwitcherComponent,
    RequestLoaderComponent,
  ],
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    BaseModule,
    TranslateModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    LanguageSwitcherComponent,
    RequestLoaderComponent,
  ],
})
export class LayoutComponentsModule {}
