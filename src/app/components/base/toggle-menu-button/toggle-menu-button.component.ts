import { Component } from '@angular/core';
import { StoreService } from '@/app/store2/store.service';

@Component({
  selector: 'ToggleMenuButton',
  templateUrl: './toggle-menu-button.component.html',
  styleUrls: ['./toggle-menu-button.component.css'],
})
export class ToggleMenuButtonComponent {
  constructor(private store: StoreService) {}

  get isMenuShown(): boolean {
    return this.store.menu.menuState;
  }
  toggleMenu(): void {
    this.store.menu.toggle();
  }
}
