import { BehaviorSubject } from 'rxjs';

type Action<T> = {
  [key: string]: { state: T; getters: any; actions: any };
};

type ActionThree<T> = {
  [key: string]: (action: Action<T>, payload: string) => any;
};

export type StoreType<T> = {
  getters: (state: any) => any;
  actions: ActionThree<T>;
  state: any;
};

export abstract class BaseStore<T> {
  private readonly _store: any;

  protected constructor(initialData: T) {
    this._store = new BehaviorSubject<T>(initialData);
  }

  public get state(): StoreType<any> {
    return this._store.getValue();
  }

  public get getters(): any {
    const getters = {} as any;

    for (const key in this.state) {
      const state = this.getState(key);
      getters[key] = {};

      for (const item in this.state[<keyof StoreType<any>>key].getters) {
        const module = this.state[<keyof StoreType<any>>key].getters;
        getters[key][item] = module[item].call(null, state);
      }
    }

    return getters;
  }

  private get actions(): any {
    const actions = {} as any;

    for (const key in this.state) {
      actions[key] = this.state[<keyof StoreType<any>>key].actions;
    }

    return actions;
  }

  public dispatch(action: string, payload?: any) {
    const foundedAction = this.getActionByKey(action, this.actions);

    if (!foundedAction) {
      return;
    }

    const [moduleKey] = action.split('.');
    const module = this.state[<keyof StoreType<any>>moduleKey];

    foundedAction.call(null, { ...module, rootState: this.state }, payload);

    this._store.next({
      ...this._store.getValue(),
    });
  }

  private getActionByKey(action: string, payload: any) {
    action = action.replace(/\[(\w+)/g, '.$1');
    action = action.replace(/^\./, '');

    const actions = action.split('.');

    actions.forEach((key) => {
      if (key in payload) {
        payload = payload[key];
      }
    });

    return payload;
  }

  private getState(module: string): any {
    return this.state[<keyof StoreType<any>>module].state;
  }
}
