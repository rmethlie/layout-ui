function apiAdd(id, parent) {
  return {
    type: 'API.CONTAINERS.ADD',
    data: { id, parent }
  };
}

function storeAdd(id, parent) {
  return {
    type: 'CONTAINERS.ADD',
    data: {id, parent}
  };
}


function close(id) {
  return {
    type: 'CONTAINERS.CLOSE',
    data: id
  }
}

function activate(id) {
  return {
    type: 'CONTAINERS.ACTIVATE',
    data: { id }
  }
}

function activateItem(id) {
  return {
    type: 'CONTAINERS.ACTIVATE_ITEM',
    data: { id }
  }
}

export default {
  API: {
    add: apiAdd
  },
  Store: {
    add: storeAdd,
    close,
    activate,
    activateItem
  }
}
