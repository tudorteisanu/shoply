import { AlertInterface } from '@/ts/interfaces';
import {
  ActionThree,
  GetterThree,
  MutationThree,
  StoreType,
} from '@/app/store3/base-store';

const state = {
  items: [] as AlertInterface[],
};

type AlertStateStoreType = typeof state;

type AlertStoreType = StoreType<AlertStateStoreType>;

const getters: GetterThree<AlertStateStoreType> = {
  items: (state: AlertStateStoreType) => state.items,
};

const mutations: MutationThree<AlertStateStoreType> = {
  SET_ITEMS: (state: AlertStateStoreType, items: AlertInterface[]) => {
    state.items = items;
  },
};

const actions: ActionThree<AlertStoreType> = {
  show: ({ commit }: AlertStoreType, payload: AlertInterface) => {
    commit('SET_ITEMS', payload);
  },

  hide: ({ state }: AlertStoreType, alert: AlertInterface) => {
    const alertIndex = state.items.findIndex(
      (item: AlertInterface) => item.id === alert.id
    );

    if (alertIndex !== -1) {
      state.items.splice(alertIndex, 1);
    }
  },
};

export { state, getters, mutations, actions, AlertStoreType };
