
export const defaultUIState = {
  rosterShow: true,
  rosterSort: 'name',
  showRosterDelete: false,
  wizardActive: false,
  wizardType: ''
}

export default function ui(state = defaultUIState, action = {}) {
  switch (action.type) {
    case 'UI.SET': {
      const dataKeys = Object.keys(action.data);
      // disallow setting of unknown props
      const newState = dataKeys.reduce((update, key) => {
        if (state.hasOwnProperty(key)) {
          update[key] = action.data[key];
        }
        return update;
      }, Object.assign({}, state));
      return newState;
    }
    default:
      return state;
  }
}
