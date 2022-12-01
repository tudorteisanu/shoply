import { LoginInterface, UserInterface } from '@/ts/interfaces';
import { Store } from '@ngxs/store';
import {
  FetchUser,
  Login,
  Logout,
  SetUser,
} from '@/app/store/auth/auth.action';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthDispatch {
  protected constructor(private store: Store) {}
  setUser(payload: UserInterface) {
    return this.store.dispatch(new SetUser(payload));
  }

  login(payload: LoginInterface) {
    return this.store.dispatch(new Login(payload));
  }

  logout() {
    return this.store.dispatch(new Logout());
  }
  fetchUser() {
    return this.store.dispatch(FetchUser);
  }
}
