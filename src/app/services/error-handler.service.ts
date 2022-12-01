import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment';
import { StoreService } from '@/app/store2/store.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(private router: Router, private store: StoreService) {}

  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
      return;
    }

    this.handleClientError(error);
  }

  handleHttpError(error: HttpErrorResponse) {
    this.store.alert.show({
      message: error.message,
      title: 'Error',
      type: 'error',
    });
  }

  handleClientError(error: Error) {
    if (!environment.production) {
      console.error(error);
    }

    this.store.alert.show({
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
