import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthButtonsComponent } from './auth-buttons/auth-buttons.component';
import { CartButtonComponent } from './cart-button/cart-button.component';
import { ToggleMenuButtonComponent } from './toggle-menu-button/toggle-menu-button.component';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    BreadcrumbComponent,
    AuthButtonsComponent,
    CartButtonComponent,
    ToggleMenuButtonComponent,
    PaginationComponent,
  ],
  imports: [CommonModule, RouterLink, RouterLinkActive],
  exports: [
    BreadcrumbComponent,
    AuthButtonsComponent,
    CartButtonComponent,
    AuthButtonsComponent,
    ToggleMenuButtonComponent,
    PaginationComponent,
  ],
})
export class BaseModule {}
