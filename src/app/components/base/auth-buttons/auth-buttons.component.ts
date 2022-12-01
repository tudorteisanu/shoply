import { Component, EventEmitter, Output } from '@angular/core';
import { PageRoutes } from '@/ts/enum';
import { Router } from '@angular/router';
import { UserInterface } from '@/ts/interfaces';
import { Select, Store } from '@ngxs/store';
import { AuthState } from '@/app/store/auth/auth.state';
import { Observable } from 'rxjs';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';

@Component({
  selector: 'AuthButtons',
  templateUrl: './auth-buttons.component.html',
})
export class AuthButtonsComponent {
  @Output() onLoginBtnClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLogoutBtnClick: EventEmitter<void> = new EventEmitter<void>();

  @Select(AuthState.loggedIn) loggedIn$: Observable<any> | undefined;

  constructor(
    private router: Router,
    private store: Store,
    private storeDispatch: StoreDispatchService
  ) {}

  get loginUrl(): string {
    return PageRoutes.Login;
  }

  get isLoginPage(): boolean {
    return this.router.url === this.loginUrl;
  }

  get user(): UserInterface | null {
    return this.store.selectSnapshot(AuthState.getUser);
  }

  get userName(): string | undefined {
    if (!this.user) {
      return '';
    }
    const { firstName, lastName } = this.user;
    return `${firstName} ${lastName}`;
  }

  logout(): void {
    this.storeDispatch.auth.logout().subscribe(() => {
      this.onLogoutBtnClick.emit();
    });
  }

  async goToLogin(): Promise<void> {
    this.onLoginBtnClick.emit();
    await this.router.navigateByUrl(this.loginUrl);
  }
}
