import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsInterface, LoginInterface, TokensInterface, UserInterface} from "@/ts/interfaces";
import {catchError, map, Observable} from "rxjs";
import {ApiRoutes, LocalstorageKeys} from "@/ts/enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  accessToken: string | null = null;
  refreshToken: string | null = null;
  user: UserInterface | null = null;

  constructor(private http: HttpClient) {
    this.accessToken = localStorage.getItem(LocalstorageKeys.AccessToken)
    this.refreshToken = localStorage.getItem(LocalstorageKeys.RefreshToken)
  }

  login(payload: LoginInterface): Promise<UserInterface> {
    return new Promise((resolve, reject) => {
      this.http.post<CredentialsInterface>(ApiRoutes.Login, payload).subscribe({
        next: ({accessToken, refreshToken, user}: CredentialsInterface) => {
          this.user = user;
          this.setTokens({accessToken, refreshToken})
          resolve(user)
        },
        error: (err) => {
          reject(err)
        }
      })
    })

  }

  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post<void>(ApiRoutes.Logout, {}).subscribe({
        next: () => {
          this.removeTokens();
          this.user = null;
          resolve()
        },
        error: (err) => {
          reject(err)
        }
      })
    })

  }

  refresh(): Observable<any> {
    return this.http.get<TokensInterface>(ApiRoutes.Refresh, {
      headers: {
        Authorization: `Bearer ${this.refreshToken}`
      }
    }).pipe(map(tokens => {
      this.setTokens(tokens)
      return tokens
    }), catchError(error => {
      this.removeTokens()
      this.user = null
      return error
    }))

  }

  getUserInfo(): Observable<UserInterface> {
    return this.http.get<UserInterface>(ApiRoutes.UserInfo)
  }

  setTokens({accessToken, refreshToken}: TokensInterface): void {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem(LocalstorageKeys.AccessToken, accessToken);
    localStorage.setItem(LocalstorageKeys.RefreshToken, refreshToken);
  }

  removeTokens(): void {
    this.accessToken = null;
    this.refreshToken = null;
    localStorage.removeItem(LocalstorageKeys.AccessToken);
    localStorage.removeItem(LocalstorageKeys.RefreshToken);
  }
}
