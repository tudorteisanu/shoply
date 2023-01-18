import { APP_INITIALIZER } from '@angular/core';
import { Store } from '@ngxs/store';
import { AuthState } from '@/app/store/auth/auth.state';
import { I18nService } from '@/app/plugins/i18n.service';
import { UserInterface } from '@/ts/interfaces';
import { AuthService } from '@/services/auth.service';
import { RemoveToken, SetUser } from '@/app/store/auth/auth.action';

export function initializeAppFactory(
  store: Store,
  translate: I18nService,
  authService: AuthService
): () => void {
  translate.checkDefaultLocale();
  return () => {
    if (store.selectSnapshot(AuthState.accessToken)) {
      authService.getUserInfo().subscribe({
        next: (user: UserInterface) => {
          store.dispatch(new SetUser(user));
        },
        error: () => {
          store.dispatch(RemoveToken);
        },
      });
    }
  };
}

export const APP_INITIALIZER_PROVIDER = {
  provide: APP_INITIALIZER,
  useFactory: initializeAppFactory,
  deps: [Store, I18nService, AuthService],
  multi: true,
};
