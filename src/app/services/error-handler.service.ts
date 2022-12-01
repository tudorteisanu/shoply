import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '@/environments/environment';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  constructor(
    private router: Router,
    private storeDispatch: StoreDispatchService
  ) {}

  handleError(error: Error) {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
      return;
    }

    this.handleClientError(error);
  }

  handleHttpError(error: HttpErrorResponse) {
    this.storeDispatch.alert.show({
      message: error.message,
      title: 'Error',
      type: 'error',
    });
  }

  handleClientError(error: Error) {
    if (!environment.production) {
      console.error(error);
    }

    this.storeDispatch.alert.show({
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
