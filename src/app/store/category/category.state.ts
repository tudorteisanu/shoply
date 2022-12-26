import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { FetchCategories } from './category.action';
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

  @Action(FetchCategories)
  set({
    patchState,
  }: StateContext<CategoryStateModel>): Observable<CategoryInterface[]> {
    return this.categoriesService.fetchForCategories().pipe(
      tap((items: CategoryInterface[]) => {
        patchState({
          items,
        });
      })
    );
  }
}
