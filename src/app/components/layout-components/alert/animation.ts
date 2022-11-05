import { animate, style, transition, trigger } from '@angular/animations';

export const alertAnimation = trigger('alertAnimation', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(100%)' }),
    animate('300ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
  ]),
  transition(':leave', [
    style({ opacity: 1 }),
    animate('400ms', style({ opacity: 0 })),
  ]),
]);
