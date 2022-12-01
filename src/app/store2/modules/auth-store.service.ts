import { Injectable } from '@angular/core';
import { StoreModel } from '@/app/store2/store.model';
import {
  CredentialsInterface,
  LoginInterface,
  UserInterface,
} from '@/ts/interfaces';
import { tap } from 'rxjs';
import { AuthService } from '@/services/auth.service';
import { LocalstorageKeys } from '@/ts/enum';

type AuthStateType = {
  user: UserInterface | null;
  accessToken: string | null;
  refreshToken: string | null;
};

const initialState: AuthStateType = {
  user: null,
  accessToken: localStorage.getItem(LocalstorageKeys.AccessToken),
  refreshToken: localStorage.getItem(LocalstorageKeys.RefreshToken),
};

@Injectable({ providedIn: 'root' })
export class AuthStoreService extends StoreModel<AuthStateType> {
  constructor(private authService: AuthService) {
    super(initialState);
  }

  get loggedIn(): boolean {
    return !!this.accessToken;
  }

  get user(): UserInterface | null {
    return this.state.user;
  }

  get accessToken(): string | null {
    return this.state.accessToken;
  }

  get refreshToken(): string | null {
    return this.state.refreshToken;
  }

  login(payload: LoginInterface) {
    return this.authService.login(payload).pipe(
      tap(({ accessToken, refreshToken, user }: CredentialsInterface) => {
        this.patchState({
          accessToken,
          refreshToken,
          user,
        });

        localStorage.setItem(LocalstorageKeys.AccessToken, accessToken);
        localStorage.setItem(LocalstorageKeys.RefreshToken, refreshToken);
      })
    );
  }

  logout() {
    return this.authService.logout().pipe(
      tap(() => {
        this.setState({
          accessToken: null,
          refreshToken: null,
          user: null,
        });

        localStorage.removeItem(LocalstorageKeys.AccessToken);
        localStorage.removeItem(LocalstorageKeys.RefreshToken);
      })
    );
  }
  fetchUser() {
    return this.authService.getUserInfo().pipe(
      tap((user) => {
        this.patchState({
          user,
        });

        return user;
      })
    );
  }
  setUser(user: UserInterface | null) {
    return this.patchState({ user });
  }

  setAccessToken(accessToken: string | null): void {
    this.patchState({
      accessToken,
    });

    if (!accessToken) {
      localStorage.removeItem(LocalstorageKeys.AccessToken);
      return;
    }
    localStorage.setItem(LocalstorageKeys.AccessToken, accessToken);
  }

  setRefreshToken(refreshToken: string | null): void {
    this.patchState({
      refreshToken,
    });

    if (!refreshToken) {
      localStorage.removeItem(LocalstorageKeys.RefreshToken);
      return;
    }
    localStorage.setItem(LocalstorageKeys.RefreshToken, refreshToken);
  }
}
