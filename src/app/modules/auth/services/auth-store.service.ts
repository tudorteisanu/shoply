import { Injectable } from '@angular/core';
import {
  CredentialsInterface,
  TokensInterface,
  UserInterface,
} from '@/ts/interfaces';
import { LocalstorageKeys } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthStoreService {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  user: UserInterface | null = null;

  constructor() {
    this.accessToken = localStorage.getItem(LocalstorageKeys.AccessToken);
    this.refreshToken = localStorage.getItem(LocalstorageKeys.RefreshToken);
  }

  public login(credentials: CredentialsInterface): void {
    const { user, ...tokens } = credentials;
    this.updateTokens(tokens);
    this.setUserInfo(user);
  }

  public logout(): void {
    this.removeTokens();
    this.setUserInfo(null);
  }

  public setUserInfo(user: UserInterface | null): void {
    this.user = user;
  }

  updateTokens({ accessToken, refreshToken }: TokensInterface): void {
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  private removeTokens(): void {
    this.setAccessToken(null);
    this.setRefreshToken(null);
  }

  public setAccessToken(token: string | null): void {
    this.accessToken = token;
    if (!token) {
      localStorage.removeItem(LocalstorageKeys.AccessToken);
      return;
    }

    localStorage.setItem(LocalstorageKeys.AccessToken, token);
  }

  public setRefreshToken(token: string | null): void {
    this.refreshToken = token;
    if (!token) {
      localStorage.removeItem(LocalstorageKeys.RefreshToken);
      return;
    }

    localStorage.setItem(LocalstorageKeys.RefreshToken, token);
  }
}
