import { Component } from '@angular/core';
import { PageRoutes } from '@/ts/enum';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CartState } from '@/app/store/cart/cart.state';

@Component({
  selector: 'CartBtn',
  templateUrl: './cart-button.component.html',
})
export class CartButtonComponent {
  @Select(CartState.count)
  cartLength!: Observable<number>;

  get cartUrl(): string {
    return PageRoutes.Cart;
  }
}
