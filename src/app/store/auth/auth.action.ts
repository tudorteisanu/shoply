import { LoginInterface, UserInterface } from '@/ts/interfaces';

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

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: LoginInterface) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class FetchUser {
  static readonly type = '[Auth] FetchUser';
}

export class RemoveToken {
  static readonly type = '[Auth] RemoveToken';
}
