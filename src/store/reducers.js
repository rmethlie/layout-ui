// reducers
import containers from './containers.reducer.js';
import conversations from './conversations.reducer.js';
import connection from './connection.reducer.js';
import roster from './roster.reducer.js';
// middleware
import connectionMiddleware from './connection.middleware.js';
import containersMiddleware from './containers.middleware.js';
import conversationsMiddleware from './conversations.middleware.js';
import rosterMiddleware from './roster.middleware.js';

export default {
  conversations,
  containers
}
