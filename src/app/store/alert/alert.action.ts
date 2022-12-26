import { AlertInterface } from '@/ts/interfaces';

export class ShowAlert {
  static readonly type = '[Alert] Hide';

  constructor(public payload: Partial<AlertInterface>) {}
}
export class HideAlert {
  static readonly type = '[Alert] Hide';

  constructor(public payload: AlertInterface) {}
}
