import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { LoadingStart, LoadingFinish } from './loading.action';

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

  @Action(LoadingStart)
  start({ setState }: StateContext<LoadingStateModel>): void {
    setState({
      state: true,
    });
  }

  @Action(LoadingFinish)
  finish({ setState }: StateContext<LoadingStateModel>): void {
    setState({
      state: false,
    });
  }
}
