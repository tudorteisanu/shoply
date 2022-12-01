import { Component, OnInit } from '@angular/core';
import { PageRoutes } from '@/ts/enum';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { CartState } from '@/app/store/cart/cart.state';

@Component({
  selector: 'CartBtn',
  templateUrl: './cart-button.component.html',
})
export class CartButtonComponent implements OnInit {
  @Select(CartState.count)
  cartLength!: Observable<number>;

  ngOnInit(): void {}

  get cartUrl(): string {
    return PageRoutes.Cart;
  }
}
