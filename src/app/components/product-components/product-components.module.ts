import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductSortComponent } from './product-sort/product-sort.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { RouterLink } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { BaseModule } from '@/components/base/base.module';

@NgModule({
  declarations: [
    ProductFilterComponent,
    ProductSearchComponent,
    ProductSortComponent,
    ProductCardComponent,
    ProductListComponent,
  ],
  imports: [CommonModule, RouterLink, BaseModule],
  exports: [
    ProductFilterComponent,
    ProductSearchComponent,
    ProductSortComponent,
    ProductCardComponent,
    ProductListComponent,
  ],
})
export class ProductComponentsModule {}
