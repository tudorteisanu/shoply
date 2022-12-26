import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetch(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(ApiRoutes.Categories);
  }

  fetchForCategories(): Observable<CategoryInterface[]> {
    return this.http.get<CategoryInterface[]>(ApiRoutes.CategoriesForFilter);
  }
}
