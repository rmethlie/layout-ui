
export function createRandomId(seed) {
  return `${seed}-${new Date().getTime()}`;
}

export function findOrCreateContainer(containers, parent, jid) {
  // did we get a parent id?
  if (parent && containers.byId[parent]) {
    return containers.byId[parent];
  }

  const activeContainer = containers.byId[containers.active];
  if (activeContainer) {
    return activeContainer;
  }

  return null;
}

export function createConversation({jid, parent}, {next, getState}) {
  const container = findOrCreateContainer(getState().containers, parent, jid);
  const user = getState().roster.byId[jid];
  const title = user ? user.name : jid;
  const id = container ? container.id : createRandomId('container');
  if (!container) {
    // as these are all reducer calls, we can use next
    next({
      type: 'CONTAINERS.ADD',
      data: {
        id,
        parent: 'conversations',
        type: 'conversation',
        title: 'Conversations'
      }
    });
  }
  next({
    type: 'CONVERSATIONS.ADD',
    data: {
      jid,
      title
    }
  });
  next({
    type: 'CONTAINERS.ADD_ITEM',
    data: {
      parent: id,
      item: jid,
      type: 'conversation',
      title
    }
  });
  next({
    type: 'CONTAINERS.ACTIVATE',
    data: {id}
  });
}

export function createChatroom(data, store) {
  const {next, dispatch, getState} = store;
  const {id, jid} = data;
  next({type: 'CONVERSATIONS.ADD', data});
  // wait for it
  const activeContainer = getState().containers.active || 'conversations';
  const parent = id || activeContainer;
  const slot = Object.assign({}, {id: jid});
  dispatch({
    type: 'ADD_SLOT',
    data: {parent, slot}
  });
  dispatch({
    type: 'SET_ACTIVE',
    data: {id: parent}
  })
}

export function createMerged(data, store) {
  const {next, dispatch, getState} = store;
  const {id, jid} = data;
  next({type: 'CONVERSATIONS.ADD', data});
  // wait for it
  const activeContainer = getState().containers.active || 'conversations';
  const parent = id || activeContainer;
  const slot = Object.assign({}, {id: jid});
  dispatch({
    type: 'ADD_SLOT',
    data: {parent, slot}
  });
  dispatch({
    type: 'SET_ACTIVE',
    data: {id: parent}
  })
}

export function createMarket(data, store) {
  const {next, dispatch, getState} = store;
  const {id, jid} = data;
  next({type: 'CONVERSATIONS.ADD', data});
  // wait for it
  const activeContainer = getState().containers.active || 'conversations';
  const parent = id || activeContainer;
  const slot = Object.assign({}, {id: jid});
  dispatch({
    type: 'ADD_SLOT',
    data: {parent, slot}
  });
  dispatch({
    type: 'SET_ACTIVE',
    data: {id: parent}
  })
}

export default function conversationsMiddleware({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      switch (action.type) {
        case 'API.CONVERSATIONS.SET':
          next({
            type: 'CONVERSATIONS.SET',
            data: action.data
          });
          break;
        case 'API.CONVERSATIONS.CLEAR':
          next({
            type: 'CONVERSATIONS.SET',
            data: {}
          });
          break;
        case 'API.CONVERSATIONS.OPEN':
          switch (action.data.type) {
            case 'CHAT':
              createConversation(action.data, {next, dispatch, getState});
              break;
            case 'GROUPCHAT':
              createChatroom(action.data, {next, dispatch, getState});
              break;
            case 'MERGED':
              createMerged(action.data, {next, dispatch, getState});
              break;
            case 'MARKET':
              createMarket(action.data, {next, dispatch, getState});
              break;
            default:
              // no type implies chat type
              createConversation(action.data, {next, dispatch, getState});

          }
          break;
        case 'API.CONVERSATIONS.CLOSE':
          next({
            type: 'CONVERSATIONS.REMOVE',
            data: action.data
          });
          break;
        default:
          next(action);
      }
    }
  }
}
