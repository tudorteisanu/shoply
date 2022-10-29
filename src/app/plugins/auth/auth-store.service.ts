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
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem(LocalstorageKeys.AccessToken, accessToken);
    localStorage.setItem(LocalstorageKeys.RefreshToken, refreshToken);
  }

  private removeTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem(LocalstorageKeys.AccessToken);
    localStorage.removeItem(LocalstorageKeys.RefreshToken);
  }
}
