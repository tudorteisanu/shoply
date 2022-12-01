import { Component, Input } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'MobileMenu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent {
  @Input() items: LinkInterface[] = [];

  constructor(private store: StoreService) {}

  get show(): boolean {
    return this.store.menu.menuState;
  }
  async hide(): Promise<void> {
    this.store.menu.hide();
  }
}
