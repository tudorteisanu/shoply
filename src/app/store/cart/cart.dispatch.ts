import { Store } from '@ngxs/store';
import {
  Fetch,
  Update,
  AddProduct,
  Remove,
  IncreaseQuantity,
  ReduceQuantity,
} from './cart.action';
import { Injectable } from '@angular/core';
import { CartInterface } from '@/ts/interfaces';

@Injectable({ providedIn: 'root' })
export class CartDispatch {
  protected constructor(private store: Store) {}
  fetch() {
    return this.store.dispatch(Fetch);
  }

  update(payload: CartInterface) {
    return this.store.dispatch(new Update(payload));
  }

  add(payload: number) {
    return this.store.dispatch(new AddProduct(payload));
  }

  remove(payload: number) {
    return this.store.dispatch(new Remove(payload));
  }

  increaseQuantity(payload: number) {
    return this.store.dispatch(new IncreaseQuantity(payload));
  }

  reduceQuantity(payload: number) {
    return this.store.dispatch(new ReduceQuantity(payload));
  }
}
