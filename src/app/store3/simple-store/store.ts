type BaseStoreType = {
  [key: string]: any;
};

export class Store {
  modules: BaseStoreType;
  constructor(modules: BaseStoreType) {
    this.modules = modules;
  }

  public get state() {
    return this.modules;
  }

  public get getters(): any {
    const newGetters = {} as any;

    for (const key in this.state) {
      newGetters[key] = {};

      const { getters, state } = this.modules[key];

      for (const item in getters) {
        newGetters[key][item] = getters[item].call(null, state);
      }
    }

    return newGetters;
  }

  public commit(key: string, payload?: any): void {
    try {
      const [moduleKey] = (key as string).split('.');
      const module = this.state[<keyof BaseStoreType>moduleKey];

      const foundedAction = this.getActionByKey(<string>key, module.mutations);

      if (!foundedAction) {
        return;
      }

      foundedAction.call(null, module.state, payload);
    } catch (e) {
      console.error(e);
    }
  }

  public dispatch(action: string, payload?: any) {
    try {
      const [moduleKey] = (action as string).split('.');
      const module = this.modules[<keyof BaseStoreType>moduleKey];

      const foundedAction = this.getActionByKey(action, module.actions);

      if (!foundedAction) {
        return;
      }

      const commit = (
        commitKey: keyof typeof module.mutations,
        payload: any
      ) => {
        module.mutations[commitKey](module.state as any, payload);
      };

      foundedAction.call(
        null,
        { ...module, rootState: this.state, commit },
        payload
      );
    } catch (e) {
      console.error(e);
    }
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
}
