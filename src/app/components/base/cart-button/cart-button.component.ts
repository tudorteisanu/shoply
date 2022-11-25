import { Component, OnInit } from '@angular/core';
import { PageRoutes } from '@/ts/enum';
import { CartService } from '@/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'CartBtn',
  templateUrl: './cart-button.component.html',
})
export class CartButtonComponent implements OnInit {
  cartLength: Observable<number>;

  constructor(private cartService: CartService) {
    this.cartLength = cartService.count;
  }

  ngOnInit(): void {}

  get cartUrl(): string {
    return PageRoutes.Cart;
  }
}
