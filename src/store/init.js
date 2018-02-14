import '../params.js';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
// reducers
import containers from './containers.reducer.js';
import conversations from './conversations.reducer.js';
import connection from './connection.reducer.js';
import roster from './roster.reducer.js';
import presence from './presence.reducer.js';
import ui from './ui.reducer.js';
// middleware
import connectionMiddleware from './connection.middleware.js';
import containersMiddleware from './containers.middleware.js';
import conversationsMiddleware from './conversations.middleware.js';
import rosterMiddleware from './roster.middleware.js';
import uiMiddleware from './ui.middleware.js';

import {
  API
} from './actions.js';


export function initialize(store) {
  console.log('initializing store');
  const { dispatch, subscribe } = store;
  // create inbox
  // TODO: Create connected "gate" middleware that
  //       buffers connection related actions until
  // const inboxAction = API.Containers.add({
  //   type: 'inbox',
  //   title: 'Inbox'
  // });
  // dispatch(inboxAction);
  // for chaining, dont remove!
  window.connect = (jid, password) =>
    dispatch({
      type: 'API.CONNECTION.CONNECT',
      data: {
        credentials: {
          jid: Nitro.utils.emailToJID(jid, 'reuasmb.net'),
          password
        }
      }
    });

  const { username, password } = params;
  if (username && password) {
    setTimeout(() => {
      connect(username, password);
    }, 500);
  }

  window.Store = store;

  return store;
}

const combined = combineReducers({
  containers,
  conversations,
  connection,
  presence,
  roster,
  ui
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(combined, composeEnhancers(
  applyMiddleware(
    connectionMiddleware,
    containersMiddleware,
    conversationsMiddleware,
    rosterMiddleware,
    uiMiddleware
  )
));
export default initialize(store);
