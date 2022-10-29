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
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private authStore: AuthStoreService) {}

  get hasAccessToken(): boolean {
    return !!this.authStore.accessToken;
  }

  login(payload: LoginInterface): Observable<CredentialsInterface> {
    return this.http.post<CredentialsInterface>(ApiRoutes.Login, payload).pipe(
      map((credentials: CredentialsInterface) => {
        this.authStore.login(credentials);
        return credentials;
      })
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(ApiRoutes.Logout, {}).pipe(
      map(() => {
        this.authStore.logout();
      })
    );
  }

  refresh(): Observable<any> {
    return this.http
      .get<TokensInterface>(ApiRoutes.Refresh, {
        headers: {
          Authorization: `Bearer ${this.authStore.refreshToken}`,
        },
      })
      .pipe(
        map((tokens) => {
          this.authStore.updateTokens(tokens);
          return tokens;
        }),
        catchError((error) => {
          this.authStore.logout();
          return error;
        })
      );
  }

  getUserInfo(): Observable<UserInterface> {
    return this.http.get<UserInterface>(ApiRoutes.UserInfo).pipe(
      map((user: UserInterface) => {
        this.authStore.setUserInfo(user);
        return user;
      })
    );
  }
}
