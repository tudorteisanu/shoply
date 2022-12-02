import { StoreType } from '@/app/store3/base-store';

const state = {
  show: false as boolean,
};

type MenuStateStoreType = typeof state;

type MenuStoreType = StoreType<MenuStateStoreType>;

const getters: any = {
  show: (state: MenuStateStoreType) => state.show,
};

const actions = {
  show: ({ state }: any) => {
    state.show = true;
  },

  hide: ({ state }: MenuStoreType) => {
    state.show = false;
  },

  toggle: ({ state, rootState }: any) => {
    console.log(rootState);
    state.show = !state.show;
  },
};

export { state, getters, actions, MenuStoreType };
