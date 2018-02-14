import { API, Store } from '../../store/actions.js';

const step1 = {
  id: 'jid',
  type: 'jid',
  title: 'Add Roster Item',
  placeholder: 'JID',
  validate: ({ jid }, next) =>
    typeof jid === 'string' && jid.split('@').length === 2,
  submit: (dispatcher, data) => {
    dispatcher(API.UI.toggleWizard());
    dispatcher(API.Roster.add(data.jid));
  }
}


export default [step1];
