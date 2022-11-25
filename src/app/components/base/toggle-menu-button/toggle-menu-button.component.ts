import { Component } from '@angular/core';
import { MenuService } from '@/services/menu.service';

@Component({
  selector: 'ToggleMenuButton',
  templateUrl: './toggle-menu-button.component.html',
  styleUrls: ['./toggle-menu-button.component.css'],
})
export class ToggleMenuButtonComponent {
  constructor(private menu: MenuService) {}

  get isMenuShown(): boolean {
    return this.menu.show;
  }

  toggleMenu(): void {
    this.menu.toggleMenu();
  }
}
