import { Component } from '@angular/core';
import { StoreAdapter } from '@/app/store3';

@Component({
  selector: 'ToggleMenuButton',
  templateUrl: './toggle-menu-button.component.html',
  styleUrls: ['./toggle-menu-button.component.css'],
})
export class ToggleMenuButtonComponent {
  constructor(private store3: StoreAdapter) {}

  get isMenuShown(): boolean {
    return this.store3.getters.menu.show;
    // return this.store3.getters.menu.show;
  }
  toggleMenu(): void {
    // this.store3.commit('menu.TOGGLE');
    // this.store3.dispatch('menu.toggle');
    this.store3.dispatch('menu.toggle');
  }
}
