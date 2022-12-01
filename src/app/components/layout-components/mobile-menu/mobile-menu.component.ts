import { Component, Input } from '@angular/core';
import { LinkInterface } from '@/ts/interfaces';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { StoreDispatchService } from '@/app/store/store-dispatch.service';
import { MenuState } from '@/app/store/menu/menu.state';

@Component({
  selector: 'MobileMenu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent {
  @Input() items: LinkInterface[] = [];

  constructor(private storeDispatch: StoreDispatchService) {}

  @Select(MenuState.getState)
  show!: Observable<boolean>;

  async hide(): Promise<void> {
    this.storeDispatch.menu.hide();
  }
}
