import ContainersActions from '../store/actions/containers.actions';

export const MAX_CONTAINER_SIZE = 3;
export const MIN_CONTAINER_SIZE = 0;
export const MAX_SLOT_SIZE = 3;
export const MIN_SLOT_SIZE = 0;

function createRandomId(seed) {
  return `${seed}-${new Date().getTime()}`;
}


export default function containersMiddleware({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      const {type, data} = action;
      switch (type) {
        case 'API.CONTAINERS.LAYOUT.INCREASE_CONTAINER_SIZE': {
          const {id} = data;
          const container = getState().containers.byId[id];
          if (container) {
            const {layout} = container;
            const {containerSize} = layout;
            // cant be bigger than the max container size
            const newContainerSize =
              Math.min(containerSize + 1, MAX_CONTAINER_SIZE);
            // if we will actually do something helpful...
            if (newContainerSize > containerSize) {
              // tell the reducer about it.
              next({
                type: 'CONTAINERS.SET_LAYOUT',
                data: {id, containerSize: newContainerSize}
              });
            }
          }
          break;
        }

        case 'API.CONTAINERS.LAYOUT.DECREASE_CONTAINER_SIZE': {
          const {id} = data;
          const {byId} = getState().containers;
          const container = byId[id];
          if (container) {
            const {layout} = container;
            const {containerSize} = layout;
            // cant be bigger than the max container size
            const newContainerSize =
              Math.max(containerSize - 1, MIN_CONTAINER_SIZE);
            // if we will actually do something helpful...
            if (newContainerSize < containerSize) {
              // tell the reducer about it.
              next({
                type: 'CONTAINERS.SET_LAYOUT',
                data: {id, containerSize: newContainerSize}
              });
            }
          }
          break;
        }

        case 'API.CONTAINERS.LAYOUT.INCREASE_SLOT_SIZE': {
          const {id} = data;
          const {byId} = getState().containers;
          const container = byId[id];
          if (container) {
            const {layout} = container;
            const {slotSize} = layout;
            // cant be bigger than the max container size
            const newSlotSize =
              Math.min(slotSize + 1, MAX_SLOT_SIZE);
            // if we will actually do something helpful...
            if (newSlotSize > slotSize) {
              // tell the reducer about it.
              next({
                type: 'CONTAINERS.SET_LAYOUT',
                data: {id, slotSize: newSlotSize}
              });
            }
          }
          break;
        }

        case 'API.CONTAINERS.LAYOUT.DECREASE_SLOT_SIZE': {
          const id = action.data.id;
          const container = getState().containers.byId[id];
          if (container) {
            const currentSlotSize = container.layout.slotSize;
            // cant be bigger than the max container size
            const newSlotSize =
              Math.max(currentSlotSize - 1, MIN_SLOT_SIZE);
            // if we will actually do something helpful...
            if (newSlotSize < currentSlotSize) {
              // tell the reducer about it.
              next({
                type: 'CONTAINERS.SET_LAYOUT',
                data: {id, slotSize: newSlotSize}
              });
            }
          }
          break;
        }

        case 'API.CONTAINERS.ADD': {
          const {data} = action;
          const {id, parent} = data;
          const containerId = id || createRandomId('container');
          const containerParent = parent || 'conversations';
          next(ContainersActions.Store.add(containerId, containerParent));
          next(ContainersActions.Store.activate(containerId));
          break;
        }

        default:
          next(action);
      }
    }
  }
}
