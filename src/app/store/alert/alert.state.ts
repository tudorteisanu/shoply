import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ShowAlert, HideAlert } from './alert.action';
import { AlertInterface } from '@/ts/interfaces';
import { timer } from 'rxjs';
import { randomInteger } from '@/app/utils';

export class AlertStateModel {
  items!: AlertInterface[];
}

const DEFAULT_ALERT_CONFIG: AlertInterface = {
  withoutClosing: false,
  message: 'Operation successful',
  title: 'Success',
  type: 'success',
  timeout: 3000,
};

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
    const id = randomInteger(999, 9999);
    const alert: AlertInterface = { ...DEFAULT_ALERT_CONFIG, ...payload, id };

    if (state?.items) {
      patchState({
        items: [...state.items, alert],
      });
    } else {
      setState({
        items: [alert],
      });
    }

    if (payload.withoutClosing) {
      return;
    }

    timer(alert.timeout).subscribe(() => {
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
