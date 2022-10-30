import { Component } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { AuthService } from '@/app/modules/auth/services/auth.service';
import { AuthStoreService } from '@/app/modules/auth/services/auth-store.service';
import { MenuService } from '@/services/menu.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  readonly links: LinkInterface[] = [
    {
      to: PageRoutes.Home,
      text: 'Home',
    },
    {
      to: PageRoutes.Products,
      text: 'Products',
    },
    {
      to: PageRoutes.About,
      text: 'About',
    },
  ];
  isMenuShown: boolean = false;

  constructor(
    private authService: AuthService,
    private authStore: AuthStoreService,
    private menu: MenuService
  ) {}

  get cartUrl(): string {
    return PageRoutes.Cart;
  }

  get loginUrl(): string {
    return PageRoutes.Login;
  }

  get homeUrl(): string {
    return PageRoutes.Home;
  }

  get showLoginBtn(): boolean {
    return !this.authStore.user?.id;
  }

  get userName(): string | undefined {
    if (!this.authStore.user) {
      return '';
    }
    const { firstName, lastName } = this.authStore.user;
    return `${firstName} ${lastName}`;
  }

  get burgerClass(): string {
    if (this.isMenuShown) {
      return 'rotate-90';
    }
    return '';
  }

  logout(): void {
    this.authService.logout().subscribe();
  }

  toggleMenu(): void {
    this.menu.toggleMenu();
  }
}
