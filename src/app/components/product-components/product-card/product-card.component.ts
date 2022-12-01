import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';

@Component({
  selector: 'ProductCard',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductInterface | null = null;

  constructor(private storeDispatch: StoreDispatchService) {}

  get productUrl(): string {
    return `${PageRoutes.Products}/${this.product?.id}`;
  }

  ngOnInit(): void {}

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.storeDispatch.cart.add(this.product?.id).subscribe();
  }
}
