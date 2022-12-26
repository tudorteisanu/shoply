import { APP_INITIALIZER } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '@/app/store/auth/auth.state';
import { FetchUser } from '@/app/store/auth/auth.action';

export function initializeAppFactory(store: Store): () => void {
  return () => {
    if (store.selectSnapshot(AuthState.accessToken)) {
      try {
        store.dispatch(FetchUser);
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [Store],
  multi: true,
};
