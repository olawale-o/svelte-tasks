import { writable } from 'svelte/store';
import { getMaxPosition } from '../db/db';

function createPositionStore(state = 0) {
  const { subscribe, update, set } = writable(state);

  return {
    subscribe,
    init: async () => {
      try {
        const data = await getMaxPosition();
        set(parseInt(data) + 1024);
      } catch (error) {
        set(0)
      }
    },
    updatePosition: () => update((state) => state = state + 1024),
  }
}

export const positionStore = createPositionStore();
