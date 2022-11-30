import { ProductInterface } from '@/ts/interfaces';

export class AddProduct {
  static readonly type = '[Product] Add';

  constructor(public payload: ProductInterface) {}
}
export class RemoveProduct {
  static readonly type = '[Product] Remove';

  constructor(public payload: ProductInterface) {}
}

export class UpdateProduct {
  static readonly type = '[Product] Update';

  constructor(public payload: ProductInterface) {}
}

export class SetProducts {
  static readonly type = '[Product] Set';

  constructor(public payload: ProductInterface[]) {}
}
