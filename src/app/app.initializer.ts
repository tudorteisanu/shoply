import { APP_INITIALIZER } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '@/app/store/auth/auth.state';
import { FetchUser } from '@/app/store/auth/auth.action';
import { I18nService } from '@/app/plugins/i18n.service';

export function initializeAppFactory(
  store: Store,
  translate: I18nService
): () => void {
  translate.checkDefaultLocale();
  return () => {
    if (store.selectSnapshot(AuthState.accessToken)) {
      store.dispatch(FetchUser);
    }
  };
}

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [Store, I18nService],
  multi: true,
};
