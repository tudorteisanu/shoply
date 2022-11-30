import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PaginationInterface, ProductInterface } from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';
import { Store } from '@ngxs/store';
import { SetProducts } from '@/app/store/product/product.action';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private store: Store) {}

  fetchProducts(params: any = {}): Observable<ProductInterface[]> {
    return this.http
      .get<PaginationInterface<ProductInterface>>(ApiRoutes.Products, {
        params,
      })
      .pipe(
        map(({ data }: PaginationInterface<ProductInterface>) => {
          this.store.dispatch(
            new SetProducts(
              data.map((item) => ({
                ...item,
                imageUrl: 'assets/images/product-1.png',
                thumbs: [
                  {
                    url: 'assets/images/product-thumb-5.png',
                  },
                  {
                    url: 'assets/images/product-thumb-2.png',
                  },
                  {
                    url: 'assets/images/product-thumb-3.png',
                  },
                  {
                    url: 'assets/images/product-thumb-4.png',
                  },
                ],
              }))
            )
          );
          return data;
        })
      );
  }
}
