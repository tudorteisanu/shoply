import * as menu from '@/app/store3/modules/menu';
import * as alert from '@/app/store3/modules/alert';
import { Injectable } from '@angular/core';
import { Store } from '@/app/store3/simple-store';

const modules = { menu, alert };

@Injectable({ providedIn: 'root' })
export class StoreAdapter extends Store {
  constructor() {
    super(modules);
  }
}
