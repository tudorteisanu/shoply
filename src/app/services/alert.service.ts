import { EventEmitter, Injectable } from '@angular/core';
import { AlertInterface } from '@/ts/interfaces';

const DEFAULT_ALERT_CONFIG: AlertInterface = {
  withoutClosing: false,
  message: 'Operation successful',
  title: 'Success',
  type: 'success',
  timeout: 3000,
};

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  alertEvent: EventEmitter<AlertInterface> = new EventEmitter();

  show(payload: Partial<AlertInterface>): void {
    const alert = { ...DEFAULT_ALERT_CONFIG, ...payload };
    this.alertEvent.next(alert);
  }
}
