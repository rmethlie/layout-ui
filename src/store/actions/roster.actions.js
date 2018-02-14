
function set(key, value) {
  return {
    type: 'ROSTER.SET',
    data: { [key]: value }
  }
}

function Store_add(item) {
  return {
    type: 'ROSTER.ADD',
    data: { item }
  }
}

function API_add(jid, nickname) {
  return {
    type: 'API.ROSTER.ADD',
    data: { jid, nickname }
  }
}



function sort(order) {
  return {
    type: 'API.ROSTER.SORT',
    data: { order }
  }
}

function toggle() {
  return {
    type: 'API.UI.ROSTER.TOGGLE',
    data: {}
  }
}

function filter(filter) {
  return {
    type: 'API.ROSTER.FILTER',
    data: {
      filter
    }
  }
}

function Store_remove(jid) {
  return {
    type: 'ROSTER.REMOVE',
    data: { jid }
  }
}

function API_remove(jid) {
  return {
    type: 'API.ROSTER.REMOVE',
    data: { jid }
  }
}

export default {
  API: {
    sort,
    toggle,
    filter,
    add: API_add,
    remove: API_remove
  },
  Store: {
    set,
    add: Store_add,
    remove: Store_remove
  }
}
