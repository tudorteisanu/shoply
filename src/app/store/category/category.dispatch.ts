import { Store } from '@ngxs/store';
import { Fetch } from './category.action';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CategoryDispatch {
  protected constructor(private store: Store) {}
  fetch() {
    return this.store.dispatch(Fetch);
  }
}
