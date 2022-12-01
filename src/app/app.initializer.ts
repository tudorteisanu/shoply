import { APP_INITIALIZER } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '@/app/store/auth/auth.state';
import { AuthDispatch } from '@/app/store/auth/auth.dispatch';

export function initializeAppFactory(
  store: Store,
  authDispatch: AuthDispatch
): () => void {
  return () => {
    if (store.selectSnapshot(AuthState.accessToken)) {
      try {
        authDispatch.fetchUser().subscribe();
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [Store, AuthDispatch],
  multi: true,
};
