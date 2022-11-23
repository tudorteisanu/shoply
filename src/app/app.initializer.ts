import { AuthService } from '@/services/auth.service';
import { APP_INITIALIZER } from '@angular/core';

export function initializeAppFactory(authService: AuthService): () => void {
  return () => {
    if (authService.hasAccessToken) {
      try {
        authService.getUserInfo().subscribe();
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [AuthService],
  multi: true,
};
