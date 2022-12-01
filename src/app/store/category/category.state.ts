import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Fetch } from './category.action';
import { CategoryInterface } from '@/ts/interfaces';
import { CategoriesService } from '@/services/categories.service';
import { Observable, tap } from 'rxjs';

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
  constructor(private categoriesService: CategoriesService) {}
  @Selector()
  static getCategories(state: CategoryStateModel): CategoryInterface[] {
    return state.items;
  }

  @Action(Fetch)
  set({
    patchState,
  }: StateContext<CategoryStateModel>): Observable<CategoryInterface[]> {
    return this.categoriesService.fetch().pipe(
      tap((items: CategoryInterface[]) => {
        patchState({
          items,
        });
      })
    );
  }
}
