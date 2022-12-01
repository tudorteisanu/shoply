import { Store } from '@ngxs/store';
import { Fetch } from './product.action';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ProductDispatch {
  protected constructor(private store: Store) {}
  fetch(payload = {}) {
    return this.store.dispatch(new Fetch(payload));
  }
}
