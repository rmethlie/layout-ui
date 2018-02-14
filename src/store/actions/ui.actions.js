function hideRoster() {
  return {
    type: 'API.UI.ROSTER.SHOW',
    data: {}
  }
}

function showRoster() {
  return {
    type: 'API.UI.ROSTER.SHOW',
    data: {}
  }
}

function toggleRoster() {
  return {
    type: 'API.UI.ROSTER.TOGGLE',
    data: {}
  }
}

function toggleWizard(type) {
  return {
    type: 'API.UI.WIZARD.TOGGLE',
    data: { type }
  };
}

function toggleRosterDelete() {
  return {
    type: 'API.UI.ROSTER.TOGGLE_DELETE',
    data: {}
  }
}

function showWizard(wizardType) {
  return {
    type: 'UI.SET',
    data: {
      wizardActive: true,
      wizardType
    }
  }
}

function hideWizard() {
  return {
    type: 'UI.SET',
    data: {
      wizardActive: false,
      wizardType: ''
    }
  }
}


// store
function set(keyOrData, value) {
  if (typeof keyOrData === 'object') {
    return {
      type: 'UI.SET',
      data: keyOrData
    }
  }
  return {
    type: 'UI.SET',
    data: { [keyOrData]: value }
  }
}

export default {
  API: {
    showRoster,
    hideRoster,
    toggleRoster,
    toggleRosterDelete,
    toggleWizard
  },
  Store: {
    set,
    hideWizard,
    showWizard
  }
}
