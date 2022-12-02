import {
  ActionThree,
  GetterThree,
  MutationThree,
  StoreType,
} from '@/app/store3/base-store';

const state = {
  show: false as boolean,
};

type MenuStateStoreType = typeof state;

type MenuStoreType = StoreType<MenuStateStoreType>;

const getters: GetterThree<MenuStateStoreType> = {
  show: (state: MenuStateStoreType) => state.show,
};

const mutations: MutationThree<MenuStateStoreType> = {
  SET: (state: MenuStateStoreType, payload: boolean) => {
    state.show = payload;
  },
  TOGGLE: (state: MenuStateStoreType) => {
    state.show = !state.show;
  },
};

const actions: ActionThree<MenuStoreType> = {
  show: ({ commit }: MenuStoreType) => {
    commit('SET', true);
  },

  hide: ({ commit }: MenuStoreType) => {
    commit('SET', false);
  },

  toggle: ({ commit }: MenuStoreType) => {
    commit('TOGGLE');
  },
};

export { state, getters, actions, mutations, MenuStoreType };
