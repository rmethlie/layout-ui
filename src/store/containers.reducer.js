export const defaultContainersState = {
  byId: {},
  byItemId: {},
  active: null
}

const generateContainerId =
  () => `${Math.floor(Math.random() * (1000000 - 1) + 1)}`;

export const defaultContainerState = {
  id: null,
  type: 'conversation',
  items: [],
  activeItem: null
}


function create(container) {
  return Object.assign({}, defaultContainerState, {
    id: generateContainerId(),
    title: 'Container'
  }, container);
}

function get(state, containerId) {
  return state.byId[containerId];
}

/**
@example
const action = {
    type: 'CONTAINERS.ADD',
    data: {
      id: '1234',
      type: 'container',
      items: ['2345', '3456'],
    }
}

**/

function add(state, action) {
  const { id, active } = action.data;
  // default to root for parent
  const container = get(state, id) || create(action.data);
  // add container to the flat index
  const byId = Object.assign({}, state.byId, {
    [container.id]: container
  });
  // set active if asked to, or if there is no currently active container
  const newActive = (active === true || !state.active) ? id : state.active;
  // return the updated state
  return Object.assign({}, state, { byId, active: newActive });
}


function remove(state, action) {
  const { id } = action.data;
  const byId = Object.assign({}, state.byId);
  // if we have actually deleted a container...
  if (delete byId[id]) {
    return Object.assign({}, state, { byId });
  }
  // nothing happended, so dont churn
  return state;
}

function activate(state, action) {
  const {data} = action;
  const {id} = data;
  return Object.assign({}, state, { active: id });
}

function dedupedAdd(items = [], item) {
  if (
    // got something?
    items &&
    // is it an array?
    typeof items.slice === 'function' &&
    // without the item?
    items.indexOf(item) === -1
  ) {
    // then add it
    return [...items, item];
  }
  // otherwise just return existing
  return items;
}

function addItem(state, action) {
  const {parent, item} = action.data;
  const container = get(state, parent);
  if (container) {
    if (container.items.indexOf(item) > -1) {
      return state;
    }
    const {id} = container;
    const {byId, byItemId} = state;
    return Object.assign({}, state, {
      byId: Object.assign({}, byId, {
        [container.id]: Object.assign({}, container, {
          items: dedupedAdd(container.items, item)
        })
      }),
      byItemId: Object.assign({}, byItemId, {
        [item]: dedupedAdd(byItemId[item], id)
      })
    })
  }
  return state;
}

function activateItem(state, action) {
  const {data} = action;
  const {id} = data;
  const {byId, byItemId} = state;
  const containers = byItemId[id];
  if (containers) {
    const newById = containers.reduce(
      (collector, containerId) => {
        const container = byId[containerId];
        if (container) {
          return Object.assign({}, collector, {
            [containerId]: Object.assign({}, container, {
              activeItem: id
            })
          });
        }
        return collector;
      }
    , byId);

    return Object.assign({}, state, {byId: newById});
  }

  return state;
}

export default function containers(state = defaultContainersState, action = {}) {
  switch (action.type) {
    case 'CONTAINERS.ADD':
      return add(state, action);
    case 'CONTAINERS.REMOVE':
      return remove(state, action);
    case 'CONTAINERS.ACTIVATE':
      return activate(state, action);
    case 'CONTAINERS.ADD_ITEM':
      return addItem(state, action);
    case 'CONTAINERS.ACTIVATE_ITEM':
      return activateItem(state, action);
    default:
      return state;
  }
}
