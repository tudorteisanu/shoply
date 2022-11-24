import { Component, OnInit } from '@angular/core';
import { LinkInterface, ProductInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { Observable } from 'rxjs';
import { ProductsService } from '@/services/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
})
export class ProductsListComponent implements OnInit {
  breadcrumb: LinkInterface[] = [
    {
      to: PageRoutes.Home,
      text: 'Home',
    },
    {
      to: PageRoutes.Products,
      text: 'Product',
    },
  ];

  products: Observable<ProductInterface[]>;

  constructor(private productsService: ProductsService) {
    this.products = productsService.items;
  }

  ngOnInit(): void {
    this.productsService.fetchProducts().subscribe();
  }
}
