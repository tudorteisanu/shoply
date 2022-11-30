import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AddUser, RemoveUser } from './user.action';
import { UserInterface } from '@/ts/interfaces';

export class UserStateModel {
  users!: UserInterface[];
}

@State<UserStateModel>({
  name: 'users',
  defaults: {
    users: [],
  },
})
@Injectable()
export class UserState {
  @Selector()
  static getUsers(state: UserStateModel): UserInterface[] {
    return state.users;
  }

  @Action(AddUser)
  add(
    { getState, patchState, setState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ): void {
    const state = getState();
    if (state?.users) {
      patchState({
        users: [...state.users, payload],
      });
    } else {
      setState({
        users: [payload],
      });
    }
  }

  @Action(RemoveUser)
  remove(
    { getState, setState }: StateContext<UserStateModel>,
    { payload }: AddUser
  ): void {
    const state = getState();
    if (state?.users) {
      setState({
        users: state.users.filter((u) => !(u.email === payload.email)),
      });
    }
  }
}
