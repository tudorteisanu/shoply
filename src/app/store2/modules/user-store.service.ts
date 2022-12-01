import { Injectable } from '@angular/core';
import { StoreModel } from '@/app/store2/store.model';

type UserStateType = {
  discount: number;
};

const initialState: UserStateType = {
  discount: 25,
};

@Injectable({ providedIn: 'root' })
export class UserStoreService extends StoreModel<UserStateType> {
  constructor() {
    super(initialState);
  }

  get discount(): number {
    return this.state.discount;
  }
}
