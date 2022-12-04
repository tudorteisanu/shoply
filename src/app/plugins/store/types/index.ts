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
  actions: ActionThree<StoreType<T>>;
  state: T;
  commit: (key: keyof MutationThree<T>, payload?: any) => void;
};
