import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CredentialsInterface,
  LoginInterface,
  TokensInterface,
  UserInterface,
} from '@/ts/interfaces';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { ApiRoutes, LocalstorageKeys } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  user: BehaviorSubject<UserInterface | null> =
    new BehaviorSubject<UserInterface | null>(null);
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem(LocalstorageKeys.AccessToken);
    this.refreshToken = localStorage.getItem(LocalstorageKeys.RefreshToken);
  }

  get hasAccessToken(): boolean {
    return !!this.accessToken;
  }

  login(payload: LoginInterface): Observable<CredentialsInterface> {
    return this.http.post<CredentialsInterface>(ApiRoutes.Login, payload).pipe(
      map((credentials: CredentialsInterface) => {
        this.setCredentials(credentials);
        return credentials;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(ApiRoutes.Logout, {}).pipe(
      map(() => {
        this.removeCredentials();
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
          this.removeCredentials();
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

  public setCredentials(credentials: CredentialsInterface): void {
    const { user, ...tokens } = credentials;
    this.updateTokens(tokens);
    this.setUserInfo(user);
    window.location.href = '/';
  }

  public removeCredentials(): void {
    this.removeTokens();
    this.setUserInfo(null);
    window.location.href = '/';
  }

  public setUserInfo(user: UserInterface | null): void {
    this.user.next(user);
    this.loggedIn.next(!!user);
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
