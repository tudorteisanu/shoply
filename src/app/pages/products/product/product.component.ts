import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaInterface } from '@/ts/interfaces';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  thumbs: MediaInterface[] = [
    {
      url: 'assets/images/product-thumb-5.png',
    },
    {
      url: 'assets/images/product-thumb-2.png',
    },
    {
      url: 'assets/images/product-thumb-3.png',
    },
    {
      url: 'assets/images/product-thumb-4.png',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
