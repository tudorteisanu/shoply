import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  SetCategories,
  AddCategory,
  RemoveCategory,
  UpdateCategory,
} from './category.action';
import { CategoryInterface } from '@/ts/interfaces';

export class CategoryStateModel {
  items!: CategoryInterface[];
}

@State<CategoryStateModel>({
  name: 'category',
  defaults: {
    items: [],
  },
})
@Injectable()
export class CategoryState {
  @Selector()
  static getCategories(state: CategoryStateModel): CategoryInterface[] {
    return state.items;
  }

  @Action(AddCategory)
  add(
    { getState, patchState, setState }: StateContext<CategoryStateModel>,
    { payload }: AddCategory
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
  @Action(UpdateCategory)
  update(
    { getState, patchState, setState }: StateContext<CategoryStateModel>,
    { payload }: UpdateCategory
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

  @Action(SetCategories)
  set(
    { patchState }: StateContext<CategoryStateModel>,
    { payload: items }: SetCategories
  ): void {
    patchState({
      items,
    });
  }

  @Action(RemoveCategory)
  remove(
    { getState, setState }: StateContext<CategoryStateModel>,
    { payload }: RemoveCategory
  ): void {
    const state = getState();
    if (state?.items) {
      setState({
        items: state.items.filter((u) => !(u.id === payload.id)),
      });
    }
  }
}
