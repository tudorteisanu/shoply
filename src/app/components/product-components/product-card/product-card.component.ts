import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';

@Component({
  selector: 'ProductCard',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductInterface | null = null;

  constructor() {}

  get productUrl(): string {
    return `${PageRoutes.Products}/${this.product?.id}`;
  }

  ngOnInit(): void {}
}
