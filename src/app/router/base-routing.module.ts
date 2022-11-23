import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PageErrors } from '@/ts/enum';
import { AuthRouterModule } from './auth-router.module';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/layouts/default/default.component').then(
        (m) => m.DefaultComponent
      ),
    children: [
      {
        path: '',
        title: 'Home',
        loadComponent: () =>
          import('@/pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'about',
        title: 'About',
        loadComponent: () =>
          import('@/pages/about/about.component').then((m) => m.AboutComponent),
      },
      {
        path: 'products',
        title: 'Product List',
        loadChildren: () =>
          import('@/pages/products/products.module').then(
            (m) => m.ProductsModule
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('@/pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'errors/not-found',
        loadComponent: () =>
          import('@/pages/errors/not-found/not-found.component').then(
            (m) => m.NotFoundComponent
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: PageErrors.NotFound,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
    AuthRouterModule,
  ],
})
export class BaseRoutingModule {}
