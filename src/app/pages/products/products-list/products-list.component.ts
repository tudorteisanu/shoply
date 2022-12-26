import { Component, OnInit } from '@angular/core';
import { LinkInterface, ProductInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { ProductState } from '@/app/store/product/product.state';
import { FetchProducts, SetFilters } from '@/app/store/product/product.action';
import { FetchCategories } from '@/app/store/category/category.action';

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

  @Select(ProductState.getProducts)
  products!: BehaviorSubject<ProductInterface[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FetchCategories);
    this.store.dispatch(FetchProducts);
    this.parseQueryParams();
  }

  parseQueryParams(): void {
    let filters: any = { ...this.activatedRoute.snapshot.queryParams };

    if (filters.hasOwnProperty('categories')) {
      filters = {
        ...filters,
        categories: filters.categories.map(Number),
      };
    }

    this.store.dispatch(new SetFilters(filters));
  }
}
