export const defaultContainersState = {
  byId: {},
  active: null
}

const generateContainerId =
  () => `${Math.floor(Math.random() * (1000000 - 1) + 1)}`;

export const defaultContainerState = {
  id: null,
  type: 'container',
  items: []
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
  state.byId = Object.assign({}, state.byId, {
    [container.id]: container
  });
  // set active if asked to, or if there is no currently active container
  if (active === true || !state.active) {
    state.active = id;
  }
  // return the updated state
  return state;
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
  const active = action.data.id;
  const container = state.byId[active];
  if (container) {
    return Object.assign({}, state, {active});
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
    default:
      return state;
  }
}
