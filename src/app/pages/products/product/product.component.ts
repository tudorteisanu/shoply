import { Component } from '@angular/core';
import {
  LinkInterface,
  MediaInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@/services/products.service';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
  product: Observable<ProductInterface | undefined> = this.store.select(
    (state) =>
      state.items.find((item: ProductInterface) => item.id === this.productId)
  );

  thumbs: Observable<MediaInterface[]> = this.store.select((state) => {
    const itemIndex = state.items.findIndex(
      (item: ProductInterface) => item.id === this.productId
    );

    if (itemIndex !== -1) {
      return state.items[itemIndex].thumbs;
    }

    return [];
  });

  breadcrumb: LinkInterface[] = [
    {
      to: PageRoutes.Home,
      text: 'Home',
    },
    {
      to: PageRoutes.Products,
      text: 'Product',
    },
    {
      to: `${PageRoutes.Products}/${this.productId}`,
      text: 'Mouse',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private store: Store
  ) {}

  get productId(): number {
    return Number(this.route.snapshot.params['id']);
  }
}
