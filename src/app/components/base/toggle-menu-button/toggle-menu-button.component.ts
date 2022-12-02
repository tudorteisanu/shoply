import { Component } from '@angular/core';
import { StoreService } from '@/app/store2/store.service';
import { Store3 } from '@/app/store3';

@Component({
  selector: 'ToggleMenuButton',
  templateUrl: './toggle-menu-button.component.html',
  styleUrls: ['./toggle-menu-button.component.css'],
})
export class ToggleMenuButtonComponent {
  constructor(private store: StoreService, private store3: Store3) {}

  get isMenuShown(): boolean {
    return this.store.menu.menuState;
  }
  toggleMenu(): void {
    // this.store.menu.toggle();
    this.store3.dispatch('menu.toggle');
  }
}
