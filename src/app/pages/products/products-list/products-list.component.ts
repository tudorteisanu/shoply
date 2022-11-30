import { Component, OnInit } from '@angular/core';
import {
  CategoryInterface,
  LinkInterface,
  ProductInterface,
} from '@/ts/interfaces';
import { PageRoutes } from '@/ts/enum';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProductsService } from '@/services/products.service';
import { CategoriesService } from '@/services/categories.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { ProductState } from '@/app/store/product/product.state';
import { CategoryState } from '@/app/store/category/category.state';

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
  filters: any = {};

  @Select(ProductState.getProducts)
  products!: Observable<ProductInterface[]>;

  constructor(
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.parseQueryParams();
    this.categoriesService.fetch().subscribe();
    this.loadData();
  }

  async setFilters(filter: any): Promise<void> {
    this.filters = filter;
    this.loadData();
  }

  parseQueryParams(): void {
    this.filters = this.activatedRoute.snapshot.queryParams;
  }

  loadData(): void {
    this.productsService.fetchProducts(this.filters).subscribe(async () => {
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
