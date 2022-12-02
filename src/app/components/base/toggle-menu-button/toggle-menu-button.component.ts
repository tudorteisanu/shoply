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
    return this.store3.getters.menu.show;
  }
  toggleMenu(): void {
    this.store3.commit('menu.TOGGLE');
  }
}
