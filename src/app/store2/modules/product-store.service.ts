import { Injectable } from '@angular/core';
import {
  MediaInterface,
  PaginationInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { StoreModel } from '@/app/store2/store.model';
import { Observable, tap } from 'rxjs';
import { ProductsService } from '@/services/products.service';

type ProductStateType = {
  items: ProductInterface[];
};

const initialState: ProductStateType = {
  items: [],
};

@Injectable({
  providedIn: 'root',
})
export class ProductStoreService extends StoreModel<ProductStateType> {
  constructor(private productService: ProductsService) {
    super(initialState);
  }

  get items(): ProductInterface[] {
    return this.state.items;
  }

  getById(id: number): ProductInterface | undefined {
    return this.items.find((item) => item.id === id);
  }

  getProductThumbs(id: number): MediaInterface[] {
    const item = this.state.items.find(
      (item: ProductInterface) => item.id === id
    );

    if (item?.thumbs) {
      return item.thumbs;
    }

    return [];
  }

  fetch(filters = {}): Observable<PaginationInterface<ProductInterface>> {
    return this.productService.fetch(filters).pipe(
      tap(({ data: items }) => {
        this.setState({
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
