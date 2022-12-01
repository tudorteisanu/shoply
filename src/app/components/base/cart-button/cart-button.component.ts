import { Component } from '@angular/core';
import { PageRoutes } from '@/ts/enum';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'CartBtn',
  templateUrl: './cart-button.component.html',
})
export class CartButtonComponent {
  constructor(private store: StoreService) {}

  get cartUrl(): string {
    return PageRoutes.Cart;
  }

  get cartLength(): number {
    return this.store.cart.cartLength;
  }
}
