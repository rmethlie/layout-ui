import Roster from '../connection/roster.manager.js';
import { API, Store } from './actions.js';

export function filter(roster, presence) {
  const { filter, all } = roster;
  const { byId } = presence;
  let test;
  switch (filter) {
    case 'unavailable':
      test = (item) => byId[item.jid] === 'unavailable';
    case 'available':
      test = (item) => byId[item.jid] === 'available';
    case 'away':
      test = (item) => byId[item.jid] === 'away';
    case 'dnd':
      test = (item) => byId[item.jid] === 'dnd';
    case 'unknown':
      test = (item) => byId[item.jid] === 'unknown';
    default: return all;
  }

  return all.filter(test);
}

function generatePromiseKey() {
  return `promise-${Math.floor(Math.random() * (new Date().getTime()))}`;
}
const promises = {};
function registerPromise(promise) {
  if (promise instanceof Promise) {
    console.warn('registerPromise not given instance of Promise');
    return null;
  }
  const key = generatePromiseKey();
  promises[key] = promise;
  return promise;
}

function createPromise(func) {
  if (typeof func !== 'function') {
    console.warn('createPromise not provided instance of Function');
    return null;
  }
  const promise = new Promise(func);
  return registerPromise(promise);
}


export default function rosterMiddleware({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      const rosterManager = Roster.getInstance();
      switch (action.type) {
        case 'API.ROSTER.SET':
          next({
            type: 'ROSTER.SET',
            data: action.data
          });
          break;
        case 'API.ROSTER.CLEAR':
          next({
            type: 'ROSTER.SET',
            data: {}
          });
          break;
        case 'API.ROSTER.ADD': {
          const { jid, nickname } = action.data;
          const nick = nickname || jid;
          rosterManager.add({
            jid, nickname: nick
          });
          // TODO: NEED CONNECTION HERE
          break;
        }
        case 'API.ROSTER.REMOVE': {
          const { jid } = action.data;
          rosterManager.remove({ jid });
          // TODO: NEED CONNECTION HERE
          break;
        }
        case 'API.ROSTER.FILTER': {
          const { filter } = action.data;
          const currentFilter = getState().roster.filter;
          const newFilter = currentFilter === filter ? '' : filter;
          next({
            type: 'ROSTER.FILTER',
            data: { filter: newFilter }
          });
        }
        default:
          next(action);
      }
    }
  }
}
