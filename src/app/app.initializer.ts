import { AuthService } from '@/services/auth.service';
import { APP_INITIALIZER } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '@/app/store/auth/auth.state';

export function initializeAppFactory(
  authService: AuthService,
  store: Store
): () => void {
  return () => {
    if (store.selectSnapshot(AuthState.accessToken)) {
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
  deps: [AuthService, Store],
  multi: true,
};
