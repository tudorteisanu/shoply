import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  MediaInterface,
  PaginationInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { ApiRoutes } from '@/ts/enum';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  items: BehaviorSubject<ProductInterface[]> = new BehaviorSubject<
    ProductInterface[]
  >([]);

  constructor(private http: HttpClient) {}

  fetchProducts(params: any = {}): Observable<ProductInterface[]> {
    return this.http
      .get<PaginationInterface<ProductInterface>>(ApiRoutes.Products, {
        params,
      })
      .pipe(
        map(({ data }: PaginationInterface<ProductInterface>) => {
          this.items.next(
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
          );
          return data;
        })
      );
  }

  getById(id: number): Observable<ProductInterface | undefined> {
    return this.items.pipe(
      map((items) => items.find((item) => item.id === id))
    );
  }

  getThumbsById(id: number): Observable<MediaInterface[]> {
    return this.items.pipe(
      map((items) => items.find((item) => item.id === id)?.thumbs || [])
    );
  }

  getCartProducts(): Observable<ProductInterface[]> {
    return this.items.pipe(
      map((items) =>
        items
          .filter((item) => item.id)
          .map((item) => ({
            ...item,
            quantity: 23,
          }))
      )
    );
  }

  get cartLength(): Observable<number> {
    return this.items.pipe(map((items) => items.length));
  }
}
