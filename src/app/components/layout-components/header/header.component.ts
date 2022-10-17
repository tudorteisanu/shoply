import { Component } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import {AuthService} from "@/services/auth.service";

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

  constructor(private authService: AuthService) {
  }

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
    return !this.authService.user?.id
  }

  get userName(): string|undefined {
    if (!this.authService.user) {
      return  ''
    }
    const {firstName, lastName} = this.authService.user
    return `${firstName} ${lastName}`
  }

  logout(): void {
    // this.authService.logout().subscribe()
    localStorage.removeItem('token');
    this.authService.token = null;
    this.authService.user = null;
  }

}
