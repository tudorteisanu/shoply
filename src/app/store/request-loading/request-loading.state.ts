import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  RequestLoadingStart,
  RequestLoadingFinish,
} from './request-loading.action';

export class RequestLoadingStateModel {
  state!: boolean;
}

@State<RequestLoadingStateModel>({
  name: 'requestLoading',
  defaults: {
    state: false,
  },
})
@Injectable()
export class RequestLoadingState {
  @Selector()
  static getState(state: RequestLoadingStateModel): boolean {
    return state.state;
  }

  @Action(RequestLoadingStart)
  start({ setState }: StateContext<RequestLoadingStateModel>): void {
    setState({
      state: true,
    });
  }

  @Action(RequestLoadingFinish)
  finish({ setState }: StateContext<RequestLoadingStateModel>): void {
    setState({
      state: false,
    });
  }
}
