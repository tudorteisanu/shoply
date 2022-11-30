import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { UserState } from '@/app/store/user/user.state';
import { ProductState } from '@/app/store/product/product.state';
import { AuthState } from '@/app/store/auth/auth.state';
import { AlertState } from '@/app/store/alert/alert.state';
import { CategoryState } from '@/app/store/category/category.state';
import { MenuState } from '@/app/store/menu/menu.state';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxsModule.forRoot([
      UserState,
      ProductState,
      AuthState,
      AlertState,
      CategoryState,
      MenuState,
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
})
export class StoreModule {}
