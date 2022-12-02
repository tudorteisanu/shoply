import { AlertInterface } from '@/ts/interfaces';
import { StoreType } from '@/app/store3/base-store';

const state = {
  items: [] as AlertInterface[],
};

type AlertStateStoreType = typeof state;

type AlertStoreType = StoreType<AlertStateStoreType>;

const getters: any = {
  items: (state: AlertStateStoreType) => state.items,
};

const actions: any = {
  show: ({ state }: AlertStoreType, payload: AlertInterface) => {
    state.items.push(payload);
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

export { state, getters, actions, AlertStoreType };
