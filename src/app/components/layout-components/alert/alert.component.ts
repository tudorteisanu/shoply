import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertInterface } from '@/ts/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { alertAnimation } from '@/components/layout-components/alert/animation';
import { Select, Store } from '@ngxs/store';
import { AlertState } from '@/app/store/alert/alert.state';
import { HideAlert } from '@/app/store/alert/alert.action';

@Component({
  selector: 'Alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  animations: [alertAnimation],
})
export class AlertComponent {
  @Select(AlertState.getItems)
  public items!: Observable<Array<AlertInterface>>;

  constructor(private store: Store) {}

  public hide(alert: AlertInterface): void {
    this.store.dispatch(new HideAlert(alert));
  }
}
