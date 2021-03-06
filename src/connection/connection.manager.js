import Matcher from './matcher.util.js';
import Roster from './roster.manager.js';
import Directory from './directory.manager.js';
import Presence from './presence.manager.js';
import User from './user.manager.js';
import STATUS_LABELS from './status-labels.enum.js';

export default class Connection {

  constructor({dispatch, getState}) {
    this.matcher = new Matcher();
    this.store = {dispatch, getState};
    this.user = {
      jid: '',
      credentials: {
        username: null,
        password: null
      }
    };
    this.connection = Nitro.getConnection({
      appName: 'TRM3',
      appVersion: '0.0.1',
      clientRevision: '12345'
    });

    this.initComponents(
      this.connection,
      this.store,
      this.matcher
    );
    this.initListeners(this.connection.eventManager);
  }

  initComponents(connection, store, matcher) {
    // get component references
    this.components = {
      roster: Roster.getInstance({ connection, store, matcher }),
      directory: Directory.getInstance({ connection, store, matcher }),
      presence: Presence.getInstance({ connection, store, matcher })
      // storage: new StorageManager(connection.getComponent(Nitro.STORAGE)),
      // blocklist: new BlocklistManager(connection.getComponent(Nitro.BLOCKLIST)),
      // muc: new MUCManager(connection.getComponent(Nitro.MUC)),
      // messaging: new MessageManager(connection.getComponent(Nitro.MESSAGING))
    };
  }

  initListeners(eventManager) {
    eventManager.listenTo(Nitro.Events.ROSTER_ADDED, this.onContactAddedOrUpdated.bind(this));
    eventManager.listenTo(Nitro.Events.ROSTER_REMOVED, this.onContactRemoved.bind(this));
    eventManager.listenTo(Nitro.Events.ROSTER_INVITE_RECEIVED, this.onInviteReceived.bind(this));

    window.addEventListener('beforeunload', this.onBeforeUnload.bind(this));
  }

  onBeforeUnload(event) {
    this._noReconnect = true;
    this.connection.disconnect('page unload');
  }

  onContactAddedOrUpdated(data) {
    const { xml, json, adapters } = data;
    console.log(xml);
  }

  onContactRemoved(data) {
    const { xml, json, adapters } = data;
    console.log(xml);
  }

  onInviteReceived(data) {
    const { xml, json, adapters } = data;
    console.log(xml);
  }

  onInitialSelfPresenceUpdate(data) {
    const { xml, json, adapters } = data;
    console.log(xml);
  }

  setCredentials(credentials) {
    if (credentials) {
      const { jid, password } = credentials;
      if (typeof jid === 'string' && typeof password === 'string') {
        this.user.credentials = Object.assign({}, credentials);
        return this.user.credentials;
      }
    }
    console.warn('[Connection] Got incomplete or non-existent credentials.');
    return false;
  }

  connect(user = {}) {
    this.user = new User(user);
    this.connection.connect(Object.assign({}, this.user.credentials, {
      callback: this.onConnectionStatus.bind(this)
    }));
  }

  setCurrentUser(data) {
    console.log('user data', data);
    this.user = Object.assign({}, this.user, data);
  }

  onConnected() {
    console.log('[Connection] onConnected');
    this.store.dispatch({
      type: 'CONNECTION.CURRENT_USER',
      data: { jid: this.user.jid }
    })
    this.store.dispatch({
      type: 'SET_AUTH_STATUS',
      data: 'AUTHENTICATED'
    });
    // Reset the reconnect retryer function
    this._reconnector = null;
    // Save the password now that we know it's valid
    // Look up out own friendly contact information in Directory


    // Update status on NitroChat models.
    // nitroChats = app.conversations.getNitroChats()
    // _.invoke nitroChats, 'set', 'status',
    //   Nitro.SubscriptionStatus.SUBSCRIBED
    // // Re-join each groupchat model
    // nitroGroupchats = app.conversations.getNitroGroupchats()
    // nitroGroupchats.forEach @chatrooms.join.bind @chatrooms
    this.matcher.setNitroDomain(this.getNitroDomain());
    this.components.roster.load();
    this.components.directory.find(this.user.jid)
      .then(this.setCurrentUser.bind(this));
    this.components.presence.setAvailable();
  }

  getNitroDomain() {
    const jid = this.user.bareJID;
    if (!jid) {
      return '';
    }
    Strophe.getBareJidFromJid(jid);
    const jidParts = /@.+$/.exec(jid);
    if (jidParts) {
      return jidParts[0].substr(1);
    }
    return '';
  }

  onConnectionStatus(update) {
    // The caller of #disconnect() may have passed in options to indicate that
    // we should not reconnect (beforeunload or explicit disconnection from the user)
    // Only set this value if one is provided in the options here.
    const {noReconnect, status, error} = Object.assign({}, {
      noReconnect: this._noReconnect,
      status: '',
      message: ''
    }, update);

    console.log('[NitroConnection] onConnectionStatus', STATUS_LABELS[update.status]);

    // reassign this for some reason?
    this._noReconnect = noReconnect;

    switch (status) {
      case Nitro.Status.CONNECTING:
        break;
      case Nitro.Status.CONNECTED: {
        this.onConnected();
        break;
      }

      case Nitro.Status.DISCONNECTED: {
        this.store.dispatch({
          type: 'SET_AUTH_STATUS',
          data: 'INVALID'
        });
        // Update status on NitroChat and NitroGroupchat models.
        // toUnsubscribe = app.conversations.getNitroChatsAndGroupchats()
        // _.invoke toUnsubscribe, 'set', 'status',
        //   Nitro.SubscriptionStatus.UNSUBSCRIBED

        // Attempt to reconnect, if allowed
        if (!_noReconnect) {
          this.startReconnect();
        }
        break;
      }
      case Nitro.Status.AUTHENTICATING:
        this.store.dispatch({
          type: 'SET_AUTH_STATUS',
          data: 'AUTHENTICATING'
        });
        break;

      case Nitro.Status.FATAL_FAILURE:
      case Nitro.Status.CONNTIMEOUT: {
        this._reconnector = null
        const msg = `${error.message} Logging you out now.`;
        console.log('[Connection]', msg);
        break;
      }

      default:
        console.log('[Connection] Unknown or irrelevant connection status', status);
    }


    this.store.dispatch({
      type: 'SET_CONNECTION_STATUS',
      data: STATUS_LABELS[status]
    });
  }
}
