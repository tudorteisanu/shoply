import { Store } from '@ngxs/store';
import { Start, Finish } from './loading.action';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingDispatch {
  protected constructor(private store: Store) {}
  start() {
    return this.store.dispatch(Start);
  }

  finish() {
    return this.store.dispatch(Finish);
  }
}
