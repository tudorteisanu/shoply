import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  AddProduct,
  RemoveProduct,
  SetProducts,
  UpdateProduct,
} from './product.action';
import { ProductInterface } from '@/ts/interfaces';

export class ProductStateModel {
  items!: ProductInterface[];
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    items: [],
  },
})
@Injectable()
export class ProductState {
  @Selector()
  static getProducts(state: ProductStateModel): ProductInterface[] {
    return state.items;
  }

  @Action(AddProduct)
  add(
    { getState, patchState, setState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ): void {
    const state = getState();
    if (state?.items) {
      patchState({
        items: [...state.items, payload],
      });
    } else {
      setState({
        items: [payload],
      });
    }
  }
  @Action(UpdateProduct)
  update(
    { getState, patchState, setState }: StateContext<ProductStateModel>,
    { payload }: UpdateProduct
  ): void {
    const state = getState();
    if (state?.items) {
      patchState({
        items: [...state.items, payload],
      });
    } else {
      setState({
        items: [payload],
      });
    }
  }

  @Action(SetProducts)
  set(
    { patchState }: StateContext<ProductStateModel>,
    { payload: items }: SetProducts
  ): void {
    patchState({
      items,
    });
  }

  @Action(RemoveProduct)
  remove(
    { getState, setState }: StateContext<ProductStateModel>,
    { payload }: RemoveProduct
  ): void {
    const state = getState();
    if (state?.items) {
      setState({
        items: state.items.filter((u) => !(u.id === payload.id)),
      });
    }
  }
}
