import { ActionThree, GetterThree, StoreType } from '@/app/store3/base-store';

const state = {
  show: false as boolean,
};

type MenuStateStoreType = typeof state;

type MenuStoreType = StoreType<MenuStateStoreType>;

const getters: GetterThree<MenuStateStoreType> = {
  show: (state: MenuStateStoreType) => state.show,
};

const actions: ActionThree<MenuStoreType> = {
  show: ({ state }: MenuStoreType) => {
    state.show = true;
  },

  hide: ({ state }: MenuStoreType) => {
    state.show = false;
  },

  toggle: ({ state }: MenuStoreType) => {
    state.show = !state.show;
  },
};

export { state, getters, actions, MenuStoreType };
