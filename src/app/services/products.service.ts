import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationInterface, ProductInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  fetchProducts(
    params: any = {}
  ): Observable<PaginationInterface<ProductInterface>> {
    return this.http.get<PaginationInterface<ProductInterface>>(
      ApiRoutes.Products,
      {
        params,
      }
    );
  }
}
