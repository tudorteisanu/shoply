import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { MenuState } from '@/app/store/menu/menu.state';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';

@Component({
  selector: 'ToggleMenuButton',
  templateUrl: './toggle-menu-button.component.html',
})
export class ToggleMenuButtonComponent {
  constructor(private storeDispatch: StoreDispatchService) {}

  @Select(MenuState.getState)
  isMenuShown!: Observable<boolean>;

  toggleMenu(): void {
    this.storeDispatch.menu.toggle();
  }
}
