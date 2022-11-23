import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from '@/pages/products/products-list/products-list.component';
import { ProductComponent } from '@/pages/products/product/product.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from '@/components/base/base.module';
import { ProductComponentsModule } from '@/components/product-components/product-components.module';

const routes: Routes = [
  {
    path: '',
    component: ProductsListComponent,
  },
  {
    path: ':id',
    component: ProductComponent,
  },
];

@NgModule({
  declarations: [ProductsListComponent, ProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BaseModule,
    ProductComponentsModule,
  ],
})
export class ProductsModule {}
