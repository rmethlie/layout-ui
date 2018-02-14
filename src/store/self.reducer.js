

function formatItemName(name) {
  const [formattedName, formattedCompany] = name.split('-');
  return {formattedName, formattedCompany};
}

// do some fixin...
function mergeSelf(state, self) {
  const newSelf = Object.assign({}, state, self);
  return Object.assign(newSelf, formatItemName(newSelf.name));
}

const defaultSelfState = {
  jid: '',
  name: '',
  email: '',
  company: ''
}

// actual reducer
export default function roster(state = defaultSelfState, action = {}) {
  switch (action.type) {
    case 'SELF.SET': {
      return mergeSelf(state, action.data);
      break;
    }

    default:
      return state;
  }
}
