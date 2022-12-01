import { Injectable } from '@angular/core';
import { StoreModel } from '@/app/store2/store.model';

type MenuStateType = {
  show: boolean;
};

const initialState: MenuStateType = {
  show: false,
};

@Injectable({ providedIn: 'root' })
export class MenuStoreService extends StoreModel<MenuStateType> {
  constructor() {
    super(initialState);
  }

  get menuState(): boolean {
    return this.state.show;
  }

  show(): void {
    this.setState({ show: true });
  }

  hide(): void {
    this.setState({ show: false });
  }

  toggle(): void {
    this.setState({ show: !this.state.show });
  }
}
