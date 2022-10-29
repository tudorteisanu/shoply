import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationInterface, ProductInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class ProductsStoreService {
  products: ProductInterface[] = [];

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<ProductInterface[]> {
    return this.http
      .get<PaginationInterface<ProductInterface>>(ApiRoutes.Products)
      .pipe(
        map(({ data }: PaginationInterface<ProductInterface>) => {
          this.products = data;
          return data;
        })
      );
  }
}
