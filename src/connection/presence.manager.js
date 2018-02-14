let __instance__;

export default class Presence {

  static getInstance(config) {
    __instance__ = __instance__ || new Presence(config);
    return __instance__;
  }

  constructor({ connection, store }) {
    const { getComponent, eventManager, setPresence } = connection;
    this.dispatch = store.dispatch.bind(store);
    this.getComponent = getComponent.bind(connection, Nitro.PRESENCE);
    this.setPresence = setPresence.bind(connection);
    this.addEventListeners(eventManager);
  }

  addEventListeners(eventManager) {
    eventManager
      .listenTo(
        Nitro.Events.PRESENCE_SELF_UPDATE,
        this.onSelfUpdate.bind(this)
      );
    eventManager
      .listenTo(
        Nitro.Events.PRESENCE_USER_UPDATE,
        this.onUserUpdate.bind(this)
      );
  }

  isChat2Email(jid) {
    return /@email\./i.test(jid);
  }

  onSelfUpdate({ xml, json, adapters }) {
    console.log('[PRESENCE] Self Update');
    const {jid, email, presence, status} = adapters.parseXMPPPresence(json);
    const self = true;
    this.dispatch({
      type: 'PRESENCE.SET',
      data: {jid, email, presence, status, self}
    });
  }

  onUserUpdate({ xml, json, adapters }) {
    // console.log('[PRESENCE] User Update');
    const {jid, email, presence, status} = adapters.parseXMPPPresence(json);
    const processedPresence = this.isChat2Email(jid) ? 'email' : presence;
    const self = false;
    this.dispatch({
      type: 'PRESENCE.SET',
      data: {jid, email, presence: processedPresence, status, self }
    });
  }

  setAvailable() {
    this.setPresence(Nitro.XMPPPresence.AVAILABLE);
  }

  setUnavailable() {
    this.setPresence(Nitro.XMPPPresence.UNAVAILABLE);
  }

};
