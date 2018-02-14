
export function createRandomId(seed) {
  return `${seed}-${new Date().getTime()}`;
}

export function createConversation({id, jid, parent = createRandomId('conv')}, {next}) {
  const slot = Object.assign({}, {id: jid});
  // as these are all reducer calls, we can use next
  next({
    type: 'CONTAINERS.ADD',
    data: {
      id: parent,
      parent: 'conversations'
    }
  });
  next({type: 'CONVERSATIONS.ADD', data: {jid}});
  next({
    type: 'ADD_SLOT',
    data: {parent, slot}
  });
  next({
    type: 'SET_ACTIVE',
    data: {id: parent}
  })
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
