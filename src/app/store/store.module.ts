import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { ProductState } from '@/app/store/product/product.state';
import { AuthState } from '@/app/store/auth/auth.state';
import { AlertState } from '@/app/store/alert/alert.state';
import { CategoryState } from '@/app/store/category/category.state';
import { MenuState } from '@/app/store/menu/menu.state';
import { LoadingState } from '@/app/store/loading/loading.state';
import { CartState } from '@/app/store/cart/cart.state';
import { RequestLoadingState } from '@/app/store/request-loading/request-loading.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      ProductState,
      AuthState,
      AlertState,
      CategoryState,
      MenuState,
      LoadingState,
      CartState,
      RequestLoadingState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
})
export class StoreModule {}
