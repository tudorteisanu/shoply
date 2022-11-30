import { UserInterface } from '@/ts/interfaces';

export class SetUser {
  static readonly type = '[Auth] SetUser';

  constructor(public payload: UserInterface | null) {}
}
export class SetAccessToken {
  static readonly type = '[Auth] SetTokens';

  constructor(public payload: string | null) {}
}
export class SetRefreshToken {
  static readonly type = '[Auth] SetTokens';

  constructor(public payload: string | null) {}
}
