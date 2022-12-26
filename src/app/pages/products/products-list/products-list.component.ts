import { Component, OnInit } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
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

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(FetchCategories);
    this.parseQueryParams();
    this.store.dispatch(FetchProducts);
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
