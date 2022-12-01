import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '@/components/base/base.module';
import { CartInterface, LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { FormsModule } from '@angular/forms';
import { StoreService } from '@/app/store2/store.service';

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

  constructor(private store: StoreService) {}

  get cart(): CartInterface[] {
    return this.store.cart.items;
  }

  get count(): number {
    return this.cart.length;
  }

  get subtotal(): number {
    return this.cart.reduce(
      (total: number, item: CartInterface) =>
        total + item.product.price * item.quantity,
      0
    );
  }
  get total(): number {
    return this.subtotal - this.discount;
  }

  get discount(): number {
    return this.store.user.discount;
  }

  increaseQuantity(cartItemId: number): void {
    this.store.cart.increaseQuantity(cartItemId).subscribe();
  }

  reduceQuantity(cartItemId: number): void {
    this.store.cart.reduceQuantity(cartItemId).subscribe();
  }

  trackById(index: number, cart: CartInterface) {
    return cart.id;
  }

  updateItem(cart: CartInterface) {
    this.store.cart.update({
      ...cart,
      quantity: Number(cart.quantity),
    });
  }

  removeItem(cartId: number) {
    this.store.cart.remove(cartId).subscribe(() => {
      this.store.alert.show({
        type: 'success',
      });
    });
  }
}
