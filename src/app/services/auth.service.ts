import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CredentialsInterface, LoginInterface} from "@/ts/interfaces";
import {Observable} from "rxjs";
import {ApiRoutes} from "@/ts/enum";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  credentials: CredentialsInterface | null = null;

  constructor(private http: HttpClient) {
    const credentials =localStorage.getItem('credentials')

    if (credentials) {
      this.credentials = JSON.parse(credentials)
    }
  }

  login(payload: LoginInterface): Observable<CredentialsInterface> {
      return this.http.post<CredentialsInterface>(ApiRoutes.Login, payload)
  }

  logout(): Observable<void> {
      return this.http.post<void>(ApiRoutes.Logout, {})
  }
}
