import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CredentialsInterface,
  LoginInterface,
  TokensInterface,
  UserInterface,
} from '@/ts/interfaces';
import { catchError, map, Observable } from 'rxjs';
import { ApiRoutes, LocalstorageKeys } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  user: UserInterface | null = null;

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem(LocalstorageKeys.AccessToken);
    this.refreshToken = localStorage.getItem(LocalstorageKeys.RefreshToken);
  }

  get hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  get loggedIn(): boolean {
    return this.hasAccessToken && !!this.user;
  }

  fetchLogin(payload: LoginInterface): Observable<CredentialsInterface> {
    return this.http.post<CredentialsInterface>(ApiRoutes.Login, payload).pipe(
      map((credentials: CredentialsInterface) => {
        this.login(credentials);
        return credentials;
      })
    );
  }

  fetchLogout(): Observable<void> {
    return this.http.post<void>(ApiRoutes.Logout, {}).pipe(
      map(() => {
        this.logout();
      })
    );
  }

  refresh(): Observable<any> {
    return this.http
      .get<TokensInterface>(ApiRoutes.Refresh, {
        headers: {
          Authorization: `Bearer ${this.refreshToken}`,
        },
      })
      .pipe(
        map((tokens) => {
          this.updateTokens(tokens);
          return tokens;
        }),
        catchError((error) => {
          this.logout();
          return error;
        })
      );
  }

  getUserInfo(): Observable<UserInterface> {
    return this.http.get<UserInterface>(ApiRoutes.UserInfo).pipe(
      map((user: UserInterface) => {
        this.setUserInfo(user);
        return user;
      })
    );
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
