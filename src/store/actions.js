import Roster from './actions/roster.actions.js';
import Containers from './actions/containers.actions.js';
import UI from './actions/ui.actions.js';

export const API = {
  Roster: Roster.API,
  Containers: Containers.API,
  UI: UI.API
}

export const Store = {
  Roster: Roster.Store,
  Containers: Containers.Store,
  UI: UI.Store
}
