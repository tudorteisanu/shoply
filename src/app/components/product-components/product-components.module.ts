import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ListComponent } from './list/list.component';
import { ProductSortComponent } from './product-sort/product-sort.component';
import { ProductCardComponent } from './product-card/product-card.component';
import {RouterLink} from "@angular/router";

@NgModule({
  declarations: [ProductFilterComponent, ProductSearchComponent, ListComponent, ProductSortComponent, ProductCardComponent],
  imports: [CommonModule, RouterLink],
  exports: [ProductFilterComponent, ProductSearchComponent, ListComponent, ProductSortComponent, ProductCardComponent],
})
export class ProductComponentsModule {}
