import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ApiRoutes, PageRoutes } from '@/ts/enum';
import { ShowAlert } from '@/app/store/alert/alert.action';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: [],
})
export class ResetPasswordComponent implements OnInit {
  form = new FormGroup({
    password: new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(256),
    ]),
    passwordConfirmation: new FormControl('12345678', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(256),
    ]),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  async ngOnInit(): Promise<void> {
    if (!this.token) {
      await this.router.navigateByUrl(PageRoutes.Login);
      return;
    }

    await this.checkToken();
  }

  get query(): Record<string, string> {
    return this.route.snapshot.queryParams;
  }

  get token(): string | undefined {
    return this.query['token'];
  }

  get loginUrl(): string {
    return PageRoutes.Login;
  }

  async checkToken(): Promise<void> {
    const body = { token: this.token };
    this.http.post(ApiRoutes.CheckResetToken, body).subscribe({
      error: (err: any) => {
        this.store.dispatch(
          new ShowAlert({ type: 'error', message: err.message })
        );
        this.router.navigateByUrl(PageRoutes.Login);
      },
    });
  }

  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    this.http
      .post(ApiRoutes.ResetPassword, { ...this.form.value, token: this.token })
      .subscribe({
        next: () => {
          this.store.dispatch(
            new ShowAlert({
              type: 'success',
              message: 'Password successful rested!',
            })
          );
          this.router.navigateByUrl(PageRoutes.Login);
        },
        error: (err: any) => {
          this.store.dispatch(
            new ShowAlert({
              type: 'error',
              message: err.message,
            })
          );
        },
      });
  }
}
