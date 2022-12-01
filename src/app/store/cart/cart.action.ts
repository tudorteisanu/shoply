import { CartInterface } from '@/ts/interfaces';

export class Fetch {
  static readonly type = '[Cart] Fetch';
}

export class AddProduct {
  static readonly type = '[Cart] AddProduct';

  constructor(public payload: number) {}
}

export class Remove {
  static readonly type = '[Cart] Remove';

  constructor(public payload: number) {}
}

export class Update {
  static readonly type = '[Cart] Update';

  constructor(public payload: CartInterface) {}
}

export class IncreaseQuantity {
  static readonly type = '[Cart] IncreaseQuantity';

  constructor(public payload: number) {}
}

export class ReduceQuantity {
  static readonly type = '[Cart] ReduceQuantity';

  constructor(public payload: number) {}
}
