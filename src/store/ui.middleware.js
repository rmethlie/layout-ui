import { API, Store } from './actions.js';

export default function uiMiddleware({ dispatch, getState }) {
  return (next) => {
    return (action) => {
      switch (action.type) {
        case 'API.UI.ROSTER.SHOW':
          next(API.UI.showRoster());
          break;
        case 'API.UI.ROSTER.HIDE':
          next(API.UI.hideRoster());
          break;
        case 'API.UI.ROSTER.TOGGLE': {
          // negate
          const show = !getState().ui.rosterShow;
          next(Store.UI.set('rosterShow', show));
          break;
        }
        case 'API.UI.ROSTER.SORT':
          next(sortRoster(action.data));
          break;
        case 'API.UI.ROSTER.TOGGLE_DELETE': {
          const { showRosterDelete } = getState().ui;
          const show = !showRosterDelete;
          next(Store.UI.set({
            showRosterDelete: show
          }));
          break;
        }

        case 'API.UI.WIZARD.TOGGLE': {
          const { wizardActive } = getState().ui;
          const active = !wizardActive;
          const { type } = action.data;
          next(Store.UI.set({
            wizardActive: active,
            wizardType: type
          }));
          break;
        }
        default:
          next(action);
      }
    }
  }
}
