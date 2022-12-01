import { Injectable } from '@angular/core';
import { StoreModel } from '@/app/store2/store.model';

type LoadingStateType = {
  show: boolean;
};

const initialState: LoadingStateType = {
  show: false,
};

@Injectable({ providedIn: 'root' })
export class LoadingStoreService extends StoreModel<LoadingStateType> {
  constructor() {
    super(initialState);
  }

  get show(): boolean {
    return this.state.show;
  }

  start(): void {
    this.setState({ show: true });
  }

  finish(): void {
    this.setState({ show: false });
  }

  get getState(): boolean {
    return this.state.show;
  }
}
