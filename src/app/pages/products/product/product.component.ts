import { Component, OnInit } from '@angular/core';
import {
  LinkInterface,
  MediaInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '@/services/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  product: Observable<ProductInterface | undefined>;
  thumbs: Observable<MediaInterface[]>;

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
    private productsService: ProductsService
  ) {
    this.product = this.productsService.getById(this.productId);
    this.thumbs = this.productsService.getThumbsById(this.productId);
  }

  get productId(): number {
    return Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {}
}
