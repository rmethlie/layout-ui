import Matcher from './matcher.util.js';
import JID from './jid.util.js';
import { API, Store } from '../store/actions.js';

let __instance__;

export default class Roster {

  static getInstance(config) {
    __instance__ = __instance__ || new Roster(config);
    return __instance__;
  }

  constructor({ connection, store, matcher }) {
    const { getComponent, eventManager } = connection;
    this.dispatch = store.dispatch.bind(store);
    this.getComponent = getComponent.bind(connection, Nitro.ROSTER);
    this.addEventListeners(eventManager);
    this.matcher = matcher;
  }

  addEventListeners(eventManager) {
    eventManager.listenTo(Nitro.Events.ROSTER_ADDED, this.onContactUpdate.bind(this));
    eventManager.listenTo(Nitro.Events.ROSTER_REMOVED, this.onContactRemoved.bind(this));
    eventManager.listenTo(Nitro.Events.ROSTER_INVITE_RECEIVED, this.onInviteReceived(this));
  }

  onContactUpdate({json, adapters}) {
    const item = json.query.item;
    // normalize as array
    const items = !!item.splice ? item : [item];

    const contacts = items.map(this.mapItemToContact.bind(this, adapters));
    const dispatch = this.dispatch.bind(this);
    contacts.forEach((contact) => {
      dispatch(Store.Roster.add(contact));
    });
    // groupIds = extractGroupIds contacts
    // createNewGroups groupIds, EM.Enum.Provider.NITRO
    //
  }

  onContactRemoved({ json, adapters }) {
    const { jid } = json.query.item.attributes;
    console.log(`[RosterManager] Removed ${jid}`);
    this.dispatch(Store.Roster.remove(jid));
  }

  onInviteReceived() {

  }

  load() {
    this.getComponent()
      .getRoster()
      .then(this.parseRoster.bind(this))
      .then(this.storeRoster.bind(this));
  }

  parseContact(contact) {
    // group is an array of group ids
    // attributes is the jid and other contact info
    const {group, attributes} = contact;
    // remap the reference for readability (or normalization)
    const groupIds = group || [];
    // read the rest of the attributes
    const { jid, name, email, company, subscription } = attributes;
    // return a raw (unformatted) contact object
    return Object.assign({}, { jid, name, email, company, groupIds });
  }

  formatContact(contact) {
    let {
      jid = '',
      name = '',
      email = '',
      company = '',
      groupIds = [],
      nickname = '',
      domain = '',
      first_name = '',
      last_name = '',
      full_name = ''
    } = contact;
    // look for chat2email
    if (this.matcher.isNitroEmailContact(jid) || this.matcher.isFederated(jid)) {
      if (this.matcher.isNitroEmailContact(jid)) {
        //For email contacts, decode special chars that may be jid may
        //contain special chars that appear encoded.
        //@see https://github.com/ThomsonReutersEikon/chat/issues/2286
        //Turn the cleaned JID into a valid email address
        email = JID.convertSpecialJidToEmail(jid);
      } else {
        email = jid
      }

      //If the jid and name fields are identical or if the name field isn't
      //provided that means no nickname has been set and we should use the
      //email for both the name and nickname
      if ((jid === name) || !name) {
        name = email
        nickname = email
      } else {
        nickname = name
      }
    } else {
      let split;
      if (name) {
        split = name.split(' - ')
      } else {
        //Need to decode this, same reason cited, above.
        //@see https://github.com/ThomsonReutersEikon/chat/issues/2286
        split = JID.decodeCharactersInJID(jid);
        split = split.split('@');
      }
      //Use the company, if provided, or try to extract it from the name.
      if (split.length > 1) {
        company = split[1].trim();
      }
      //After taking the first name, we are assuming that the first word is the
      //first name and everything else is the last name, for sorting purposes.
      full_name = split[0].trim();
      nickname = full_name;
      name = full_name;
      first_name = full_name.split(" ")[0];
      last_name = full_name.slice(first_name.length + 1);
      domain = Strophe.getDomainFromJid(jid);
    }

    //Return attributes object
    return {
      jid,
      domain,
      name,
      first_name,
      last_name,
      nickname,
      company,
      email,
      groupIds
    };
  }

  mapItemToContact(adapters, item) {
    let jid = adapters.getBareJID(item.attributes.jid);
    // Filter out any bad data, e.g. groupchat ids (known issue for some
    // QA testing accounts).
    if (Nitro.utils.isGroupchat(jid)) {
      console.warn("[NitroRoster] Received a contact without a proper JID");
      return null;
    }
    const parsedContact = this.parseContact(item);
    return this.formatContact(parsedContact);
  }

  parseRoster(data) {
    console.log('[Roster] Parsing roster', data.json);
    const { xml, json, adapters } = data;
    const items = json.query.item || [];
    const contacts = items.map(this.mapItemToContact.bind(this, adapters))
      .filter(item => !!item);

    // this.createNewGroups(this.extractGroupIds(contacts));

    return contacts;

  }

  storeRoster(roster) {
    console.log('[Roster] Storing', roster.length, 'items');
    this.dispatch({
      type: 'API.ROSTER.SET',
      data: roster
    });
  }

  add({ jid, nickname }) {
    console.log('adding roster item', jid);
    this.getComponent().addContact({ jid });
  }

  remove({ jid, nickname }) {
    console.log('removing roster item', jid);
    this.getComponent().removeContact({ jid });
  }
}
