import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { AlertService } from '@/services/alert.service';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil, timer } from 'rxjs';
import { AlertInterface } from '@/ts/interfaces';
import { randomInteger } from '@/app/utils';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { alertAnimation } from '@/components/layout-components/alert/animation';

@Component({
  selector: 'Alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
  standalone: true,
  imports: [CommonModule, BrowserAnimationsModule],
  animations: [alertAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertComponent implements OnInit {
  public items: Array<AlertInterface> = [];

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private alertService: AlertService,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscribeNewMessage();
  }

  subscribeNewMessage(): void {
    this.alertService.alertEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe((alert: AlertInterface) => {
        this.addMessage(alert);
      });
  }

  addMessage(payload: AlertInterface): void {
    this.changeDetectionRef.markForCheck();
    const id = randomInteger(999, 10000);
    const alert = { ...payload, id };
    this.items.push(alert);
    this.changeDetectionRef.detectChanges();

    if (!alert.withoutClosing) {
      this.hide(alert);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  private hide(alert: AlertInterface): void {
    timer(alert.timeout).subscribe(() => {
      const index = this.items.findIndex(
        (item: AlertInterface) => item.id === alert.id
      );
      if (index !== -1) {
        this.items.splice(index, 1);
        this.changeDetectionRef.detectChanges();
      }
    });
  }
}
