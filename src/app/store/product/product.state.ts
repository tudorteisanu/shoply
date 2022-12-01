import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Fetch } from './product.action';
import { PaginationInterface, ProductInterface } from '@/ts/interfaces';
import { ProductsService } from '@/services/products.service';
import { Observable, tap } from 'rxjs';

export class ProductStateModel {
  items!: ProductInterface[];
}

@State<ProductStateModel>({
  name: 'product',
  defaults: {
    items: [],
  },
})
@Injectable()
export class ProductState {
  constructor(private productsService: ProductsService) {}
  @Selector()
  static getProducts(state: ProductStateModel): ProductInterface[] {
    return state.items;
  }

  @Action(Fetch)
  set({
    setState,
  }: StateContext<ProductStateModel>): Observable<
    PaginationInterface<ProductInterface>
  > {
    return this.productsService.fetchProducts().pipe(
      tap(({ data: items }: PaginationInterface<ProductInterface>) => {
        setState({
          items: items.map((item) => ({
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
          })),
        });
      })
    );
  }
}
