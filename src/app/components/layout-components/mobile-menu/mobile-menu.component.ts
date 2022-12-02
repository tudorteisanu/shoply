import { Component, Input } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { StoreService } from '@/app/store2/store.service';
import { StoreAdapter } from '@/app/store3';

@Component({
  selector: 'MobileMenu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent {
  @Input() items: LinkInterface[] = [];

  constructor(private store: StoreService, private store3: StoreAdapter) {}

  get show(): boolean {
    // return this.store3.getters.menu.show;
    return this.store3.getters.menu.show;
  }
  async hide(): Promise<void> {
    // this.store3.dispatch('menu.hide');
    this.store3.dispatch('menu.hide');
  }
}
