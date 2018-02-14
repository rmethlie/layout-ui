const defaultPresenceState = {
  byId: {},
  counts: {
    unavailable: 0,
    available: 0,
    dnd: 0,
    away: 0,
    unknown: 0,
    email: 0
  }
};

export function countPresence(counts, presence, oldPresence) {
  const newCounts = Object.assign({}, counts);
  if (oldPresence) {
    newCounts[oldPresence] -= 1;
    if (newCounts[oldPresence] < 0) {
      newCounts[oldPresence] = 0;
    }
  }
  newCounts[presence] = newCounts[presence] + 1;
  return newCounts;
}

export default function presence(state = defaultPresenceState, action = {}) {
  switch (action.type) {
    case 'PRESENCE.SET': {
      const { byId, counts } = state;
      const { jid, presence, self } = action.data;
      const oldPresence = byId[jid] ? byId[jid].presence : null;
      const newById = Object.assign({}, byId, {
        [jid]: action.data
      });
      // dont update counts for self presence
      const newCounts = self ?
        counts : countPresence(counts, presence, oldPresence);
      return {
        byId: newById,
        counts: newCounts
      }
    }

    default:
      return state;
  }
}
