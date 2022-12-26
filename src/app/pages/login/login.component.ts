import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '@/components/base/base.module';
import { FormInputComponent } from '@/components/base/form-input/form-input.component';
import { RouterLinkWithHref } from '@angular/router';
import { PageRoutes } from '@/ts/enum';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginInterface } from '@/ts/interfaces';
import { Store } from '@ngxs/store';
import { Login } from '@/app/store/auth/auth.action';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    BaseModule,
    FormInputComponent,
    RouterLinkWithHref,
    ReactiveFormsModule,
  ],
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
          console.log(err);
        },
      });
  }
}
