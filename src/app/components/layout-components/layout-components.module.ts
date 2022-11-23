import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MobileMenuComponent } from './mobile-menu/mobile-menu.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MobileMenuComponent,
    LoadingComponent,
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [HeaderComponent, FooterComponent, LoadingComponent],
})
export class LayoutComponentsModule {}
