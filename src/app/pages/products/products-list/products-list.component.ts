import { Component, OnInit } from '@angular/core';
import {
  CategoryInterface,
  LinkInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { StoreService } from '@/app/store2/store.service';

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

  filters: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private store: StoreService
  ) {}

  ngOnInit(): void {
    this.parseQueryParams();
    this.store.categories.fetch().subscribe();
    this.loadData();
  }

  get categories(): CategoryInterface[] {
    return this.store.categories.items;
  }
  get products(): ProductInterface[] {
    return this.store.product.items;
  }

  async setFilters(filter: any): Promise<void> {
    this.filters = filter;
    this.loadData();
  }

  parseQueryParams(): void {
    this.filters = this.activatedRoute.snapshot.queryParams;
  }

  loadData(): void {
    this.store.product.fetch(this.filters).subscribe(async () => {
      await this.setFiltersToQuery(this.filters);
    });
  }

  async setFiltersToQuery(queryParams: any): Promise<void> {
    await this.router.navigate([], {
      queryParams,
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'merge',
    });
  }
}
