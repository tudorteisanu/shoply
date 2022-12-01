import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Start, Finish } from './loading.action';

export class LoadingStateModel {
  state!: boolean;
}

@State<LoadingStateModel>({
  name: 'loading',
  defaults: {
    state: false,
  },
})
@Injectable()
export class LoadingState {
  @Selector()
  static getState(state: LoadingStateModel): boolean {
    return state.state;
  }

  @Action(Start)
  start({ setState }: StateContext<LoadingStateModel>): void {
    setState({
      state: true,
    });
  }

  @Action(Finish)
  finish({ setState }: StateContext<LoadingStateModel>): void {
    setState({
      state: false,
    });
  }
}
