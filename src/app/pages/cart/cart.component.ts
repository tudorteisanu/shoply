import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseModule } from '@/components/base/base.module';
import { CartInterface, LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, BaseModule],
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

  products: CartInterface[] = [
    {
      id: 1,
      name: 'Mouse T78 Black',
      imageUrl: 'assets/images/cart-image-1.png',
      price: '23',
      quantity: 23,
    },
    {
      id: 1,
      name: 'Mouse T78 Black',
      imageUrl: 'assets/images/cart-image-1.png',
      price: '23',
      quantity: 23,
    },
    {
      id: 1,
      name: 'Mouse T78 Black',
      imageUrl: 'assets/images/cart-image-1.png',
      price: '23',
      quantity: 23,
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
