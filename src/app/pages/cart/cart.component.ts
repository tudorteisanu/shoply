import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '@/components/base/base.module';
import { CartInterface, LinkInterface } from '@/ts/interfaces';
import { AlertTypes, PageRoutes } from '@/ts/enum';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { CartState } from '@/app/store/cart/cart.state';
import {
  FetchCart,
  IncreaseQuantity,
  ReduceQuantity,
  RemoveProductFromCart,
  UpdateCartProduct,
} from '@/app/store/cart/cart.action';
import { ShowAlert } from '@/app/store/alert/alert.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, BaseModule, FormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  breadcrumb: LinkInterface[] = [
    {
      to: PageRoutes.Home,
      text: 'Home',
    },
    {
      to: PageRoutes.Cart,
      text: 'My Cart',
    },
  ];

  @Select(CartState.getItems)
  cart: Observable<CartInterface[]>;

  @Select(CartState.total)
  total: Observable<number>;

  @Select(CartState.subtotal)
  subtotal: Observable<number>;

  @Select(CartState.discount)
  discount: Observable<number>;

  @Select(CartState.count)
  count: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(FetchCart);
  }

  increaseQuantity(cartItemId: number): void {
    this.store.dispatch(new IncreaseQuantity(cartItemId));
  }

  reduceQuantity(cartItemId: number): void {
    this.store.dispatch(new ReduceQuantity(cartItemId));
  }

  trackById(index: number, cart: CartInterface) {
    return cart.id;
  }

  updateItem(cart: CartInterface) {
    this.store.dispatch(
      new UpdateCartProduct({
        ...cart,
        quantity: Number(cart.quantity),
      })
    );
  }

  removeItem(cartId: number) {
    this.store.dispatch(new RemoveProductFromCart(cartId)).subscribe(() => {
      this.store.dispatch(
        new ShowAlert({
          type: AlertTypes.Success,
        })
      );
    });
  }
}
