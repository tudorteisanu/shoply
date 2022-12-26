import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '@/app/store/product/product.state';
import { Observable } from 'rxjs';
import { PaginationMetaInterface, ProductInterface } from '@/ts/interfaces';
import {
  FetchProducts,
  UpdatePagination,
} from '@/app/store/product/product.action';

@Component({
  selector: 'ProductList',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent {
  @Select(ProductState.getProducts)
  products!: Observable<ProductInterface[]>;

  @Select(ProductState.getMeta)
  meta: Observable<PaginationMetaInterface>;

  constructor(private store: Store) {}

  trackById(index: number, item: ProductInterface): number {
    return item.id;
  }

  changePage(page: number): void {
    this.store.dispatch(new UpdatePagination({ page }));
    this.store.dispatch(FetchProducts);
  }
}
