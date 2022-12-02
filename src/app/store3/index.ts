import * as menu from '@/app/store3/menu';
import * as alert from '@/app/store3/alert';
import { Injectable } from '@angular/core';
import { BaseStore } from '@/app/store3/base-store';

const modules = { menu, alert };

type BaseStoreType = typeof modules;

@Injectable({ providedIn: 'root' })
export class Store3 extends BaseStore<BaseStoreType> {
  constructor() {
    super(modules);
  }
}
