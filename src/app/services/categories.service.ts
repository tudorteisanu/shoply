import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { CategoryInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';
import { Store } from '@ngxs/store';
import { SetCategories } from '@/app/store/category/category.action';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient, private store: Store) {}

  fetch(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(ApiRoutes.Categories).pipe(
      map((data: CategoryInterface[]) => {
        this.store.dispatch(new SetCategories(data));
        return data;
      })
    );
  }
}
