import { Injectable } from '@angular/core';
import { StoreModel } from '@/app/store2/store.model';
import { AlertInterface } from '@/ts/interfaces';
import { timer } from 'rxjs';
import { randomInteger } from '@/app/utils';

const DEFAULT_ALERT_CONFIG: AlertInterface = {
  id: 0,
  withoutClosing: false,
  message: 'Operation successful',
  title: 'Success',
  type: 'success',
  timeout: 3000,
};
type AlertStateType = {
  items: AlertInterface[];
  show: boolean;
};

const initialState: AlertStateType = {
  items: [],
  show: false,
};

@Injectable({ providedIn: 'root' })
export class AlertStoreService extends StoreModel<AlertStateType> {
  constructor() {
    super(initialState);
  }

  get items(): AlertInterface[] {
    return this.state.items;
  }

  show(payload: Partial<AlertInterface>): void {
    const id = randomInteger(999, 10000);
    const alert = { ...DEFAULT_ALERT_CONFIG, ...payload, id };
    this.patchState({ items: [...this.items, alert] });

    if (alert.withoutClosing) {
      return;
    }

    timer(alert.timeout).subscribe(() => {
      this.patchState({
        items: this.items.filter((u) => u.id !== alert.id),
      });
    });
  }

  hide(alert: AlertInterface): void {
    this.patchState({
      items: this.filterItemById(this.items, alert.id),
    });
  }

  filterItemById(items: AlertInterface[], id: number) {
    return items.filter(this.filterBtId(id));
  }

  filterBtId(id: number) {
    return (item: AlertInterface) => item.id !== id;
  }
}
