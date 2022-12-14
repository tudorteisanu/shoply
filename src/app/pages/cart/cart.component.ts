import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '@/components/base/base.module';
import { CartInterface, LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';
import { Select } from '@ngxs/store';
import { CartState } from '@/app/store/cart/cart.state';

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

  constructor(private storeDispatch: StoreDispatchService) {}

  ngOnInit(): void {
    this.storeDispatch.cart.fetch();
  }

  increaseQuantity(cartItemId: number): void {
    this.storeDispatch.cart.increaseQuantity(cartItemId);
  }

  reduceQuantity(cartItemId: number): void {
    this.storeDispatch.cart.reduceQuantity(cartItemId);
  }

  trackById(index: number, cart: CartInterface) {
    return cart.id;
  }

  updateItem(cart: CartInterface) {
    this.storeDispatch.cart.update({
      ...cart,
      quantity: Number(cart.quantity),
    });
  }

  removeItem(cartId: number) {
    this.storeDispatch.cart.remove(cartId).subscribe(() => {
      this.storeDispatch.alert.show({
        type: 'success',
      });
    });
  }
}
