import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AlertTypes, ApiRoutes, PageRoutes } from '@/ts/enum';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ShowAlert } from '@/app/store/alert/alert.action';
import { I18nService } from '@/app/plugins/i18n.service';

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
    private store: Store,
    private i18n: I18nService
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
            type: AlertTypes.Success,
            message: this.i18n.t('pages.login.successMessage'),
          })
        );
        this.router.navigateByUrl(PageRoutes.Login);
      },
      error: (err: any) => {
        this.store.dispatch(
          new ShowAlert({
            type: AlertTypes.Error,
            message: err.message,
          })
        );
      },
    });
  }
}
