import { Component, EventEmitter, Output } from '@angular/core';
import { PageRoutes } from '@/ts/enum';
import { Router } from '@angular/router';
import { UserInterface } from '@/ts/interfaces';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'AuthButtons',
  templateUrl: './auth-buttons.component.html',
})
export class AuthButtonsComponent {
  @Output() onLoginBtnClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLogoutBtnClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private router: Router, private store: StoreService) {}

  get loginUrl(): string {
    return PageRoutes.Login;
  }

  get isLoginPage(): boolean {
    return this.router.url === this.loginUrl;
  }

  get user(): UserInterface | null {
    return this.store.auth.user;
  }

  get userName(): string | undefined {
    if (!this.user) {
      return '';
    }
    const { firstName, lastName } = this.user;
    return `${firstName} ${lastName}`;
  }

  get loggedIn(): boolean {
    return this.store.auth.loggedIn;
  }

  logout(): void {
    this.store.loading.start();
    this.store.auth.logout().subscribe({
      next: () => {
        this.onLogoutBtnClick.emit();
        window.location.href = '/';
      },
      error: () => {
        this.store.loading.finish();
      },
    });
  }

  async goToLogin(): Promise<void> {
    this.onLoginBtnClick.emit();
    await this.router.navigateByUrl(this.loginUrl);
  }
}
