import { Injectable } from '@angular/core';
import { AlertStoreService } from '@/app/store2/modules/alert-store.service';
import { CategoryStoreService } from '@/app/store2/modules/category-store.service';
import { ProductStoreService } from '@/app/store2/modules/product-store.service';
import { MenuStoreService } from '@/app/store2/modules/menu-store.service';
import { LoadingStoreService } from '@/app/store2/modules/loading-store.service';
import { AuthStoreService } from '@/app/store2/modules/auth-store.service';
import { CartStoreService } from '@/app/store2/modules/cart-store.service';
import { UserStoreService } from '@/app/store2/modules/user-store.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(
    public readonly alert: AlertStoreService,
    public readonly categories: CategoryStoreService,
    public readonly product: ProductStoreService,
    public readonly menu: MenuStoreService,
    public readonly loading: LoadingStoreService,
    public readonly auth: AuthStoreService,
    public readonly cart: CartStoreService,
    public readonly user: UserStoreService
  ) {}
}
