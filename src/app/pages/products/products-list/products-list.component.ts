import { Component, OnInit } from '@angular/core';
import {
  CategoryInterface,
  LinkInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { ProductState } from '@/app/store/product/product.state';
import { CategoryState } from '@/app/store/category/category.state';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';

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

  @Select(CategoryState.getCategories)
  categories!: BehaviorSubject<CategoryInterface[]>;
  _filters: any = {};

  @Select(ProductState.getProducts)
  products!: Observable<ProductInterface[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dispatchService: StoreDispatchService
  ) {}

  ngOnInit(): void {
    this.dispatchService.category.fetch().subscribe();
    this.parseQueryParams();
  }

  set filters(value: any) {
    this._filters = value;
    this.loadData();
  }

  get filters() {
    return this._filters;
  }

  parseQueryParams(): void {
    this.filters = { ...this.activatedRoute.snapshot.queryParams };

    if (this.filters.hasOwnProperty('categories')) {
      this.filters.categories = this.filters.categories.map(Number);
    }
  }

  loadData(): void {
    this.dispatchService.product.fetch(this.filters).subscribe(async () => {
      await this.setFiltersToQuery();
    });
  }

  async setFiltersToQuery(): Promise<void> {
    await this.router.navigate([], {
      queryParams: this.filters,
      relativeTo: this.activatedRoute,
    });
  }
}
