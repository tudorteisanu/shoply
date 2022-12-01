import { Injectable } from '@angular/core';
import { CategoryInterface } from '@/ts/interfaces';
import { StoreModel } from '@/app/store2/store.model';
import { Observable, take, tap } from 'rxjs';
import { CategoriesService } from '@/services/categories.service';

type CategoryStateType = {
  items: CategoryInterface[];
};

const initialState: CategoryStateType = {
  items: [],
};

@Injectable({
  providedIn: 'root',
})
export class CategoryStoreService extends StoreModel<CategoryStateType> {
  constructor(private categoriesService: CategoriesService) {
    super(initialState);
  }

  get items(): CategoryInterface[] {
    return this.state.items;
  }

  fetch(): Observable<CategoryInterface[]> {
    return this.categoriesService.fetch().pipe(
      tap((items) => {
        this.setState({ items });
      }),
      take(1)
    );
  }
}
