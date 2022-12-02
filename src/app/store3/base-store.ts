import { BehaviorSubject } from 'rxjs';

export type GetterThree<T> = {
  [key: string]: (state: T) => any;
};

export type MutationThree<T> = {
  [key: string]: (state: T, payload?: any) => any;
};

export type ActionThree<T> = {
  [key: string]: (context: T, payload: any) => any;
};

export type StoreType<T> = {
  getters: (state: any) => any;
  mutations: MutationThree<T>;
  actions: ActionThree<T>;
  state: any;
  commit: (key: keyof MutationThree<T>, payload?: any) => void;
};

export class BaseStore<T> {
  private readonly _store: any;

  constructor(initialData: T) {
    this._store = new BehaviorSubject<T>(initialData);
  }

  public get state(): StoreType<any> {
    return this._store.getValue();
  }

  public get getters(): any {
    const newGetters = {} as any;

    for (const key in this.state) {
      newGetters[key] = {};

      const { getters, state } = this.getState(key);
      for (const item in getters) {
        newGetters[key][item] = getters[item].call(null, state);
      }
    }

    return newGetters;
  }

  private get actions(): any {
    const actions = {} as any;

    for (const key in this.state) {
      actions[key] = this.state[<keyof StoreType<any>>key].actions;
    }

    return actions;
  }

  private get mutations(): any {
    const mutations = {} as any;

    for (const key in this.state) {
      mutations[key] = this.state[<keyof StoreType<any>>key].mutations;
    }

    return mutations;
  }

  public commit(key: string, payload?: any): void {
    const foundedAction = this.getActionByKey(key, this.mutations);

    if (!foundedAction) {
      return;
    }

    const [moduleKey] = key.split('.');
    const module = this.state[<keyof StoreType<any>>moduleKey];
    foundedAction.call(null, module.state, payload);

    this.emitUpdate();
  }

  public dispatch(action: string, payload?: any) {
    const foundedAction = this.getActionByKey(action, this.actions);

    if (!foundedAction) {
      return;
    }

    const [moduleKey] = action.split('.');
    const module = this.state[<keyof StoreType<any>>moduleKey];

    const commit = (commitKey: keyof typeof module.mutations, payload: any) => {
      module.mutations[commitKey](module.state, payload);
    };

    foundedAction.call(
      null,
      { ...module, rootState: this.state, commit },
      payload
    );

    this.emitUpdate();
  }

  private emitUpdate(): void {
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
