import { Component } from '@angular/core';

@Component({
  selector: 'HomeProduct',
  templateUrl: './home-product.component.html',
  styles: [],
})
export class HomeProductComponent {
  products: any[] = [
    {
      id: 1,
      imageUrl: 'assets/images/product-1.png',
    },
    {
      id: 2,
      imageUrl: 'assets/images/product-2.png',
    },
    {
      id: 3,
      imageUrl: 'assets/images/product-3.png',
    },
    {
      id: 4,
      imageUrl: 'assets/images/product-4.png',
    },
    {
      id: 5,
      imageUrl: 'assets/images/product-5.png',
    },
    {
      id: 6,
      imageUrl: 'assets/images/product-6.png',
    },
    {
      id: 7,
      imageUrl: 'assets/images/product-7.png',
    },
    {
      id: 8,
      imageUrl: 'assets/images/product-8.png',
    },
  ];
}
