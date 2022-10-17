import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BaseModule} from '@/components/base/base.module';
import {FormInputComponent} from '@/components/base/form-input/form-input.component';
import {Router, RouterLinkWithHref} from '@angular/router';
import {PageRoutes} from '@/ts/enum';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "@/services/auth.service";
import {CredentialsInterface, LoginInterface} from "@/ts/interfaces";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, BaseModule, FormInputComponent, RouterLinkWithHref, ReactiveFormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('test@domain.com', [Validators.required, Validators.email]),
    password: new FormControl('1s2ASD3d4@5678', [Validators.required, Validators.minLength(8), Validators.maxLength(128)])
  })

  constructor(private authService: AuthService, private router: Router) {
  }

  get forgotPasswordUrl(): string {
    return PageRoutes.ForgotPassword;
  }

  ngOnInit(): void {
  }

  login(): void {
    this.loginForm.markAsTouched();

    if (!this.loginForm.invalid) {
      this.authService.login(<LoginInterface>this.loginForm.value).subscribe({
        next: ({token, user}: CredentialsInterface) => {
          this.authService.token = token;
          this.authService.user = user;
          localStorage.setItem('token', token)
          this.router.navigateByUrl(PageRoutes.Home)
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
  }
}
