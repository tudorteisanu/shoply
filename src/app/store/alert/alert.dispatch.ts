import { Store } from '@ngxs/store';
import { HideAlert, ShowAlert } from './alert.action';
import { Injectable } from '@angular/core';
import { AlertInterface } from '@/ts/interfaces';
import { randomInteger } from '@/app/utils';

const DEFAULT_ALERT_CONFIG: AlertInterface = {
  withoutClosing: false,
  message: 'Operation successful',
  title: 'Success',
  type: 'success',
  timeout: 3000,
};

@Injectable({ providedIn: 'root' })
export class AlertDispatch {
  protected constructor(private store: Store) {}
  show(payload: Partial<AlertInterface>) {
    const id = randomInteger(999, 10000);

    return this.store.dispatch(
      new ShowAlert({ ...DEFAULT_ALERT_CONFIG, ...payload, id })
    );
  }

  hide(payload: AlertInterface) {
    return this.store.dispatch(new HideAlert(payload));
  }
}
