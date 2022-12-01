import { Injectable } from '@angular/core';
import { StoreModel } from '@/app/store2/store.model';
import { CartInterface, PaginationInterface } from '@/ts/interfaces';
import { Observable, tap } from 'rxjs';
import { CartService } from '@/services/cart.service';

type CartStateType = {
  items: CartInterface[];
};

const initialState: CartStateType = {
  items: [],
};

@Injectable({ providedIn: 'root' })
export class CartStoreService extends StoreModel<CartStateType> {
  constructor(private cartService: CartService) {
    super(initialState);
  }

  get items(): CartInterface[] {
    return this.state.items;
  }

  get cartLength(): number {
    return this.state.items.length;
  }

  fetch(): Observable<PaginationInterface<CartInterface>> {
    return this.cartService.fetch().pipe(
      tap(({ data: items }: PaginationInterface<CartInterface>) => {
        this.setState({ items });
      })
    );
  }

  update(payload: CartInterface) {
    return this.cartService.update(payload.id, payload).pipe(
      tap((cart: CartInterface) => {
        this.patchState({
          items: [
            ...this.items.filter((item) => item.id !== payload.id),
            cart,
          ].sort(this.sortById),
        });
      })
    );
  }

  add(payload: number): Observable<CartInterface> {
    return this.cartService.add(payload).pipe(
      tap((cart: CartInterface) => {
        this.patchState({ items: [...this.items, cart] });
      })
    );
  }

  remove(payload: number) {
    return this.cartService.remove(payload).pipe(
      tap(() => {
        this.patchState({
          items: [...this.items.filter((item) => item.id !== payload)].sort(
            this.sortById
          ),
        });
      })
    );
  }

  increaseQuantity(payload: number) {
    return this.cartService.increaseQuantity(payload).pipe(
      tap((cart: CartInterface) => {
        this.patchState({
          items: [
            ...this.items.filter((item) => item.id !== cart.id),
            cart,
          ].sort(this.sortById),
        });
      })
    );
  }

  reduceQuantity(payload: number) {
    return this.cartService.reduceQuantity(payload).pipe(
      tap((cart: CartInterface) => {
        this.patchState({
          items: [
            ...this.items.filter((item) => item.id !== cart.id),
            cart,
          ].sort(this.sortById),
        });
      })
    );
  }

  sortById(prevItem: CartInterface, currentItem: CartInterface) {
    return prevItem.id - currentItem.id;
  }
}
