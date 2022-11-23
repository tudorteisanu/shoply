import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  state: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  getState(): boolean {
    return this.state.getValue();
  }

  start(): void {
    this.state.next(true);
  }

  finish(): void {
    this.state.next(false);
  }
}
