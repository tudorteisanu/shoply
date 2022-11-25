import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageRoutes } from '@/ts/enum';
import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'AuthButtons',
  templateUrl: './auth-buttons.component.html',
})
export class AuthButtonsComponent implements OnInit {
  @Output() onLoginBtnClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() onLogoutBtnClick: EventEmitter<void> = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  get loginUrl(): string {
    return PageRoutes.Login;
  }

  get showLoginBtn(): boolean {
    return !this.authService.user.getValue()?.id;
  }

  get isLoginPage(): boolean {
    return this.router.url === this.loginUrl;
  }

  get userName(): string | undefined {
    const user = this.authService.user.getValue();
    if (!user) {
      return '';
    }
    const { firstName, lastName } = user;
    return `${firstName} ${lastName}`;
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.onLogoutBtnClick.emit();
    });
  }

  async goToLogin(): Promise<void> {
    this.onLoginBtnClick.emit();
    await this.router.navigateByUrl(this.loginUrl);
  }
}
