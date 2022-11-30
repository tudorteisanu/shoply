import { Component } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { Select } from '@ngxs/store';
import { AuthState } from '@/app/store/auth/auth.state';
import { Observable } from 'rxjs';

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

  @Select(AuthState.loggedIn) loggedIn$: Observable<any> | undefined;

  get homeUrl(): string {
    return PageRoutes.Home;
  }
}
