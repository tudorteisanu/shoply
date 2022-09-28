import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@/ts/interfaces';

@Component({
  selector: 'ProductCard',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductInterface | null = null;

  constructor() {}

  ngOnInit(): void {}
}
