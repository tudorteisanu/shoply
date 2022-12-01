import { Injectable } from '@angular/core';
import { AuthDispatch } from '@/app/store/auth/auth.dispatch';
import { CategoryDispatch } from '@/app/store/category/category.dispatch';
import { ProductDispatch } from '@/app/store/product/product.dispatch';
import { MenuDispatch } from '@/app/store/menu/menu.dispatch';
import { AlertDispatch } from '@/app/store/alert/alert.dispatch';
import { LoadingDispatch } from '@/app/store/loading/loading.dispatch';
import { CartDispatch } from '@/app/store/cart/cart.dispatch';

@Injectable({
  providedIn: 'root',
})
export class StoreDispatchService {
  constructor(
    public readonly auth: AuthDispatch,
    public readonly category: CategoryDispatch,
    public readonly product: ProductDispatch,
    public readonly alert: AlertDispatch,
    public readonly menu: MenuDispatch,
    public readonly loading: LoadingDispatch,
    public readonly cart: CartDispatch
  ) {}
}
