import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CategoryInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  items: BehaviorSubject<CategoryInterface[]> = new BehaviorSubject<
    CategoryInterface[]
  >([]);

  constructor(private http: HttpClient) {}

  fetch(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(ApiRoutes.Categories).pipe(
      map((data: CategoryInterface[]) => {
        this.items.next(data);
        return data;
      })
    );
  }
}
