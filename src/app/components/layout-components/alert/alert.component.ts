import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertInterface } from '@/ts/interfaces';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { alertAnimation } from '@/components/layout-components/alert/animation';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'Alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  animations: [alertAnimation],
})
export class AlertComponent {
  constructor(private store: StoreService) {}

  get items(): AlertInterface[] {
    return this.store.alert.items;
  }

  public hide(alert: AlertInterface): void {
    this.store.alert.hide(alert);
  }
}
