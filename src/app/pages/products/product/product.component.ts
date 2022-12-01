import { Component } from '@angular/core';
import {
  LinkInterface,
  MediaInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent {
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

  constructor(private route: ActivatedRoute, private store: StoreService) {}

  get productId(): number {
    return Number(this.route.snapshot.params['id']);
  }

  get product(): ProductInterface | undefined {
    return this.store.product.getById(this.productId);
  }

  get thumbs(): MediaInterface[] {
    return this.store.product.getProductThumbs(this.productId);
  }
}
