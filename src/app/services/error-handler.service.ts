import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from '@/services/alert.service';
import { environment } from '@/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private router: Router, private alertService: AlertService) {}

  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
      return;
    }

    this.handleClientError(error);
  }

  handleHttpError(error: HttpErrorResponse) {
    this.alertService.show({
      message: error.message,
      title: 'Error',
      type: 'error',
    });
  }

  handleClientError(error: Error) {
    if (!environment.production) {
      console.error(error);
    }

    this.alertService.show({
      message: error.message,
      type: 'error',
      title: 'Error',
    });
  }
}

export const ErrorHandlerProvider = {
  provide: ErrorHandler,
  useClass: ErrorHandlerService,
};
