import { Component, Input, OnInit } from '@angular/core';
import { ProductInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { CartService } from '@/services/cart.service';

@Component({
  selector: 'ProductCard',
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductInterface | null = null;

  constructor(private cartService: CartService) {}

  get productUrl(): string {
    return `${PageRoutes.Products}/${this.product?.id}`;
  }

  ngOnInit(): void {}

  addToCart(): void {
    if (!this.product) {
      return;
    }

    this.cartService.add(this.product?.id).subscribe();
  }
}
