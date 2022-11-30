import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ShowAlert, HideAlert } from './alert.action';
import { AlertInterface } from '@/ts/interfaces';

export class AlertStateModel {
  items!: AlertInterface[];
}

@State<AlertStateModel>({
  name: 'alert',
  defaults: {
    items: [],
  },
})
@Injectable()
export class AlertState {
  @Selector()
  static getItems(state: AlertStateModel): AlertInterface[] {
    return state.items;
  }

  @Action(ShowAlert)
  add(
    { getState, patchState, setState }: StateContext<AlertStateModel>,
    { payload }: ShowAlert
  ): void {
    const state = getState();
    if (state?.items) {
      patchState({
        items: [...state.items, payload],
      });
    } else {
      setState({
        items: [payload],
      });
    }
  }

  @Action(HideAlert)
  remove(
    { getState, setState }: StateContext<AlertStateModel>,
    { payload }: HideAlert
  ): void {
    const state = getState();
    if (state?.items) {
      setState({
        items: state.items.filter((u) => !(u.id === payload.id)),
      });
    }
  }
}
