import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ShowAlert, HideAlert } from './alert.action';
import { AlertInterface } from '@/ts/interfaces';
import { timer } from 'rxjs';

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
  show(
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

    if (payload.withoutClosing) {
      return;
    }

    timer(payload.timeout).subscribe(() => {
      setState({
        items: state.items.filter((u) => u.id !== payload.id),
      });
    });
  }

  @Action(HideAlert)
  hide(
    { setState, getState }: StateContext<AlertStateModel>,
    { payload: alert }: HideAlert
  ): void {
    const state = getState();
    setState({
      items: state.items.filter((u) => u.id !== alert.id),
    });
  }
}
