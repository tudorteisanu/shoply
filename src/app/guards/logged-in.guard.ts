import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { PageRoutes } from '@/ts/enum';
import { AuthState } from '@/app/store/auth/auth.state';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanActivate {
  constructor(private store: Store, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const isUserLoggedIn = this.store.selectSnapshot(AuthState.loggedIn);

    if (isUserLoggedIn) {
      this.router.navigateByUrl(PageRoutes.Home);
    }

    return !isUserLoggedIn;
  }
}
