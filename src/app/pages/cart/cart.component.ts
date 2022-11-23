import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '@/components/base/base.module';
import { CartInterface, LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartService } from '@/app/store/cart.service';
import { FormsModule } from '@angular/forms';
import { AlertService } from '@/services/alert.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, BaseModule, FormsModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
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

  cart: BehaviorSubject<CartInterface[]>;
  total: Observable<number>;
  subtotal: Observable<number>;
  discount: Observable<number>;
  showCartItems: Observable<boolean>;

  constructor(private cartService: CartService, private alert: AlertService) {
    this.cart = cartService.items;
    this.total = cartService.total;
    this.subtotal = cartService.subtotal;
    this.discount = cartService.discount;
    this.showCartItems = cartService.showCartItems;
  }

  increaseQuantity(cartItemId: number): void {
    this.cartService.increaseQuantity(cartItemId).subscribe();
  }

  reduceQuantity(cartItemId: number): void {
    this.cartService.reduceQuantity(cartItemId).subscribe();
  }

  trackById(index: number, cart: CartInterface) {
    return cart.id;
  }

  updateItem(cart: CartInterface) {
    this.cartService
      .updateItem(cart.id, { ...cart, quantity: Number(cart.quantity) })
      .subscribe(() => {
        this.alert.show({
          type: 'success',
        });
      });
  }

  removeItem(cartId: number) {
    this.cartService.remove(cartId).subscribe(() => {
      this.alert.show({
        type: 'success',
      });
    });
  }
}
