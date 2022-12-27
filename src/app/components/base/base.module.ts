import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthButtonsComponent } from './auth-buttons/auth-buttons.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { ToggleMenuButtonComponent } from './toggle-menu-button/toggle-menu-button.component';
import { PaginationComponent } from './pagination/pagination.component';
import { FormSelectComponent } from './form-select/form-select.component';
import { ClickOutsideModule } from '@/app/directives/click-outside/click-outside.module';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    AuthButtonsComponent,
    CartButtonComponent,
    ToggleMenuButtonComponent,
    PaginationComponent,
    FormSelectComponent,
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive, ClickOutsideModule],
  exports: [
    BreadcrumbComponent,
    AuthButtonsComponent,
    CartButtonComponent,
    AuthButtonsComponent,
    ToggleMenuButtonComponent,
    PaginationComponent,
    FormSelectComponent,
  ],
})
export class BaseModule {}
