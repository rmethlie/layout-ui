export const defaultConnectionState = {
  status: 'DISCONNECTED',
  user: ''
};

export default function connection(state = defaultConnectionState, action = {}) {
  const {type, data} = action;
  switch (type) {
    case 'SET_CONNECTION_STATUS':
      return Object.assign({}, state, {
        status: data
      });

    case 'CONNECTION.CURRENT_USER': {
      return Object.assign({}, state, {
        user: Object.assign({}, state.user, data)
      });
    }
    default: return state;
  }
}
