import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkInterface, MediaInterface } from '@/ts/interfaces';
import { BaseModule } from '@/components/base/base.module';
import { PageRoutes } from '@/ts/enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, BaseModule],
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

  breadcrumb: LinkInterface[] = [
    {
      to: PageRoutes.Home,
      text: 'Home',
    },
    {
      to: PageRoutes.Products,
      text: 'Product',
    },
    {
      to: `${PageRoutes.Products}/${this.productId}`,
      text: 'Mouse',
    },
  ];

  constructor(private route: ActivatedRoute) {}

  get productId(): number {
    return Number(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {}
}
