import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  Fetch,
  AddProduct,
  Remove,
  Update,
  IncreaseQuantity,
  ReduceQuantity,
} from './cart.action';
import { CartInterface, PaginationInterface } from '@/ts/interfaces';
import { Observable, tap } from 'rxjs';
import { CartService } from '@/services/cart.service';

export class CartStateModel {
  items!: CartInterface[];
  discount!: number;
}

@State<CartStateModel>({
  name: 'cart',
  defaults: {
    items: [],
    discount: 10,
  },
})
@Injectable()
export class CartState {
  constructor(private cartService: CartService) {}
  @Selector()
  static getItems(state: CartStateModel): CartInterface[] {
    return state.items;
  }

  @Selector()
  static count(state: CartStateModel): number {
    return state.items.length;
  }

  @Selector()
  static total(state: CartStateModel): number {
    return (
      state.items.reduce(
        (price, item) => price + Number(item.product.price) * item.quantity,
        0
      ) - state.discount
    );
  }

  @Selector()
  static subtotal(state: CartStateModel): number {
    return state.items.reduce(
      (price, item) => price + Number(item.product.price) * item.quantity,
      0
    );
  }

  @Selector()
  static discount(state: CartStateModel): number {
    return state.discount;
  }

  @Action(Fetch)
  set({
    patchState,
  }: StateContext<CartStateModel>): Observable<
    PaginationInterface<CartInterface>
  > {
    return this.cartService.fetch().pipe(
      tap(({ data: items }: PaginationInterface<CartInterface>) => {
        patchState({ items });
      })
    );
  }

  @Action(AddProduct)
  add(
    { patchState, getState }: StateContext<CartStateModel>,
    { payload }: AddProduct
  ): Observable<CartInterface> {
    const state = getState();
    return this.cartService.add(payload).pipe(
      tap((cart: CartInterface) => {
        patchState({ items: [...state.items, cart] });
      })
    );
  }

  @Action(Update)
  update(
    { patchState, getState }: StateContext<CartStateModel>,
    { payload }: Update
  ): Observable<CartInterface> {
    const state = getState();
    return this.cartService.update(payload.id, payload).pipe(
      tap((cart: CartInterface) => {
        patchState({
          items: [
            ...state.items.filter((item) => item.id !== payload.id),
            cart,
          ].sort(this.sortById),
        });
      })
    );
  }

  @Action(IncreaseQuantity)
  increaseQuantity(
    { patchState, getState }: StateContext<CartStateModel>,
    { payload }: IncreaseQuantity
  ): Observable<CartInterface> {
    const state = getState();
    return this.cartService.increaseQuantity(payload).pipe(
      tap((cart: CartInterface) => {
        patchState({
          items: [
            ...state.items.filter((item) => item.id !== cart.id),
            cart,
          ].sort(this.sortById),
        });
      })
    );
  }
  @Action(Remove)
  remove(
    { patchState, getState }: StateContext<CartStateModel>,
    { payload }: IncreaseQuantity
  ): Observable<CartInterface> {
    const state = getState();
    return this.cartService.remove(payload).pipe(
      tap(() => {
        patchState({
          items: [...state.items.filter((item) => item.id !== payload)].sort(
            this.sortById
          ),
        });
      })
    );
  }

  @Action(ReduceQuantity)
  reduceQuantity(
    { patchState, getState }: StateContext<CartStateModel>,
    { payload }: ReduceQuantity
  ): Observable<CartInterface> {
    const state = getState();
    return this.cartService.reduceQuantity(payload).pipe(
      tap((cart: CartInterface) => {
        patchState({
          items: [
            ...state.items.filter((item) => item.id !== cart.id),
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
