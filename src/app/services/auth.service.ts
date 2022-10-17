import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsInterface, LoginInterface, UserInterface} from "@/ts/interfaces";
import {Observable} from "rxjs";
import {ApiRoutes} from "@/ts/enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string | null = null;
  user: UserInterface | null = null;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token')
  }

  login(payload: LoginInterface): Observable<CredentialsInterface> {
      return this.http.post<CredentialsInterface>(ApiRoutes.Login, payload)
  }

  logout(): Observable<void> {
      return this.http.post<void>(ApiRoutes.Logout, {})
  }

  getUserInfo(): Observable<UserInterface> {
      return this.http.get<UserInterface>(ApiRoutes.UserInfo)
  }
}
