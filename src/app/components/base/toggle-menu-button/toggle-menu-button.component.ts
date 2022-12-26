import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { MenuState } from '@/app/store/menu/menu.state';
import { ToggleMenu } from '@/app/store/menu/menu.action';

@Component({
  selector: 'ToggleMenuButton',
  templateUrl: './toggle-menu-button.component.html',
})
export class ToggleMenuButtonComponent {
  constructor(private store: Store) {}

  @Select(MenuState.getState)
  isMenuShown!: Observable<boolean>;

  toggleMenu(): void {
    this.store.dispatch(ToggleMenu);
  }
}
