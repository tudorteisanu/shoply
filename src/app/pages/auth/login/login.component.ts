import { Component } from '@angular/core';
import { AlertTypes, PageRoutes } from '@/ts/enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginInterface } from '@/ts/interfaces';
import { Store } from '@ngxs/store';
import { Login } from '@/app/store/auth/auth.action';
import { ShowAlert } from '@/app/store/alert/alert.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('test@domain.com', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('1s2ASD3d4@5678', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(128),
    ]),
  });

  constructor(private store: Store) {}

  get forgotPasswordUrl(): string {
    return PageRoutes.ForgotPassword;
  }

  async login(): Promise<void> {
    this.store
      .dispatch(new Login(<LoginInterface>this.loginForm.value))
      .subscribe({
        next: () => {
          window.location.href = '/';
        },
        error: (err: any) => {
          this.store.dispatch(
            new ShowAlert({
              type: AlertTypes.Error,
              title: 'Error',
              message: err?.message,
            })
          );
        },
      });
  }
}
