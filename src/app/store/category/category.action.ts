import { CategoryInterface } from '@/ts/interfaces';

export class AddCategory {
  static readonly type = '[Category] Add';

  constructor(public payload: CategoryInterface) {}
}
export class RemoveCategory {
  static readonly type = '[Category] Remove';

  constructor(public payload: CategoryInterface) {}
}

export class UpdateCategory {
  static readonly type = '[Category] Update';

  constructor(public payload: CategoryInterface) {}
}

export class SetCategories {
  static readonly type = '[Category] Set';

  constructor(public payload: CategoryInterface[]) {}
}
