import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CredentialsInterface,
  LoginInterface,
  TokensInterface,
  UserInterface,
} from '@/ts/interfaces';
import { catchError, map, Observable } from 'rxjs';
import { ApiRoutes } from '@/ts/enum';
import { Store } from '@ngxs/store';
import {
  SetAccessToken,
  SetRefreshToken,
  SetUser,
} from '@/app/store/auth/auth.action';
import { AUTHORIZATION_HEADER_PREFIX } from '@/ts/consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

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
    const token = this.store.selectSnapshot<string>(
      (state) => state.auth.refreshToken
    );
    return this.http
      .get<TokensInterface>(ApiRoutes.Refresh, {
        headers: {
          Authorization: `${AUTHORIZATION_HEADER_PREFIX} ${token}`,
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
    this.store.dispatch(new SetUser(user));
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
    this.store.dispatch(new SetAccessToken(token));
  }

  public setRefreshToken(token: string | null): void {
    this.store.dispatch(new SetRefreshToken(token));
  }
}
