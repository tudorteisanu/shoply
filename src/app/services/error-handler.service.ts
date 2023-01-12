import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment';
import { Store } from '@ngxs/store';
import { ShowAlert } from '@/app/store/alert/alert.action';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private router: Router, private store: Store) {}

  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
      return;
    }

    this.handleClientError(error);
  }

  handleHttpError(error: HttpErrorResponse) {
    this.store.dispatch(
      new ShowAlert({
        message: error?.message || 'Internal server error!',
        title: 'Error',
        type: 'error',
      })
    );
  }

  handleClientError(error: Error) {
    if (!environment.production) {
      console.error(error);
    }

    this.store.dispatch(
      new ShowAlert({
        message:
          error?.message ||
          'An error occurred, please contact an administrator.',
        type: 'error',
        title: 'Error',
      })
    );
  }
}

export const ERROR_HANDLER_PROVIDER = {
  provide: ErrorHandler,
  useClass: ErrorHandlerService,
};
