import { APP_INITIALIZER } from '@angular/core';
import { StoreService } from '@/app/store2/store.service';

export function initializeAppFactory(store: StoreService): () => void {
  return () => {
    if (store.auth.loggedIn) {
      try {
        store.auth.fetchUser().subscribe();
        store.cart.fetch().subscribe();
      } catch (e) {
        console.log(e);
      }
    }
  };
}

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [StoreService],
  multi: true,
};
