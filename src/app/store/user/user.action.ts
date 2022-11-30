import { UserInterface } from '@/ts/interfaces';

export class AddUser {
  static readonly type = '[User] Add';

  constructor(public payload: UserInterface) {}
}
export class RemoveUser {
  static readonly type = '[User] Remove';

  constructor(public payload: UserInterface) {}
}
