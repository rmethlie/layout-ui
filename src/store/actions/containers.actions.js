function add(container) {
  return {
    type: 'CONTAINERS.ADD',
    data: container
  };
}

function close(id) {
  return {
    type: 'CONTAINERS.CLOSE',
    data: id
  }
}

export default {
  API: {
    add
  },
  Store: {
    add,
    close
  }
}
