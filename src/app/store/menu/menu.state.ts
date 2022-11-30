import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { HideMenu, ShowMenu, ToggleMenu } from './menu.action';

export class MenuStateModel {
  state!: boolean;
}

@State<MenuStateModel>({
  name: 'menu',
  defaults: {
    state: false,
  },
})
@Injectable()
export class MenuState {
  @Selector()
  static getState(state: MenuStateModel): boolean {
    return state.state;
  }

  @Action(ShowMenu)
  show({ setState }: StateContext<MenuStateModel>): void {
    setState({
      state: true,
    });
  }

  @Action(HideMenu)
  hide({ setState }: StateContext<MenuStateModel>): void {
    setState({
      state: false,
    });
  }

  @Action(ToggleMenu)
  toggle({ setState, getState }: StateContext<MenuStateModel>): void {
    const storeState = getState();
    const state = !storeState.state;
    setState({
      state,
    });
  }
}
