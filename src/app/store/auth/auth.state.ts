import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SetUser, SetAccessToken, SetRefreshToken } from './auth.action';
import { UserInterface } from '@/ts/interfaces';
import { LocalstorageKeys } from '@/ts/enum';

export class AuthStateModel {
  user!: UserInterface | null;
  accessToken!: string | null;
  refreshToken!: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    user: null,
    refreshToken: localStorage.getItem(LocalstorageKeys.RefreshToken),
    accessToken: localStorage.getItem(LocalstorageKeys.AccessToken),
  },
})
@Injectable()
export class AuthState {
  @Selector()
  static getUser(state: AuthStateModel): UserInterface | null {
    return state.user;
  }

  @Selector()
  static loggedIn(state: AuthStateModel): boolean {
    return !!state.accessToken;
  }

  @Selector()
  static accessToken(state: AuthStateModel): string | null {
    return state.accessToken;
  }

  @Selector()
  static refreshToken(state: AuthStateModel): string | null {
    return state.refreshToken;
  }

  @Action(SetUser)
  setUser(
    { patchState }: StateContext<AuthStateModel>,
    { payload: user }: SetUser
  ): void {
    patchState({
      user,
    });
  }

  @Action(SetAccessToken)
  setAccessToken(
    { patchState }: StateContext<AuthStateModel>,
    { payload: accessToken }: SetAccessToken
  ): void {
    patchState({
      accessToken,
    });

    if (!accessToken) {
      localStorage.removeItem(LocalstorageKeys.AccessToken);
      return;
    }
    localStorage.setItem(LocalstorageKeys.AccessToken, accessToken);
  }

  @Action(SetRefreshToken)
  setRefreshToken(
    { patchState }: StateContext<AuthStateModel>,
    { payload: refreshToken }: SetRefreshToken
  ): void {
    patchState({
      refreshToken,
    });

    if (!refreshToken) {
      localStorage.removeItem(LocalstorageKeys.RefreshToken);
      return;
    }
    localStorage.setItem(LocalstorageKeys.RefreshToken, refreshToken);
  }
}
