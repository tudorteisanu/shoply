import { Store } from '@ngxs/store';
import { ToggleMenu, HideMenu, ShowMenu } from './menu.action';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuDispatch {
  protected constructor(private store: Store) {}
  show() {
    return this.store.dispatch(ShowMenu);
  }

  hide() {
    return this.store.dispatch(HideMenu);
  }

  toggle() {
    return this.store.dispatch(ToggleMenu);
  }
}
