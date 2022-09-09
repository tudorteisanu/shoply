import { Component } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
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

  get cartUrl(): string {
    return PageRoutes.Cart;
  }

  get loginUrl(): string {
    return PageRoutes.Login;
  }
}
