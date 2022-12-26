import { Component, Input } from '@angular/core';
import { ProductInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { Store } from '@ngxs/store';
import { AddProductToCart } from '@/app/store/cart/cart.action';

@Component({
  selector: 'ProductCard',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input() product: ProductInterface | null = null;

  constructor(private store: Store) {}

  get productUrl(): string {
    return `${PageRoutes.Products}/${this.product?.id}`;
  }

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.store.dispatch(new AddProductToCart(this.product?.id));
  }
}
