import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { ApiRoutes, PageRoutes } from '@/ts/enum';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShowAlert } from '@/app/store/alert/alert.action';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
})
export class ForgotPasswordComponent {
  form = new FormGroup({
    email: new FormControl('teisanutudort@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store
  ) {}

  get loginUrl(): string {
    return PageRoutes.Login;
  }

  async submit(): Promise<void> {
    this.form.markAllAsTouched();
    if (!this.form.valid) {
      return;
    }

    this.http.post(ApiRoutes.ForgotPassword, this.form.value).subscribe({
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
