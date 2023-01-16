import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ShowAlert, HideAlert } from './alert.action';
import { AlertInterface } from '@/ts/interfaces';
import { timer } from 'rxjs';
import { randomInteger } from '@/app/utils';
import { AlertTypes } from '@/ts/enum';

export class AlertStateModel {
  items!: AlertInterface[];
}

const DEFAULT_ALERT_CONFIG: AlertInterface = {
  withoutClosing: false,
  message: 'Operation successful',
  title: 'Success',
  type: AlertTypes.Success,
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
    { getState, patchState }: StateContext<AlertStateModel>,
    { payload }: ShowAlert
  ): void {
    const state = getState();
    const id = randomInteger(999, 9999);
    const message =
      payload?.message || 'Unknown error, please, contact an administrator!';
    const alert: AlertInterface = {
      ...DEFAULT_ALERT_CONFIG,
      ...payload,
      id,
      message,
    };

    patchState({
      items: [...state.items, alert],
    });

    if (payload.withoutClosing) {
      return;
    }

    timer(alert.timeout).subscribe(() => {
      const state = getState();
      const items = state.items.filter((item) => item.id !== alert.id);

      patchState({
        items,
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
      items: state.items.filter((item) => item.id !== alert.id),
    });
  }
}
