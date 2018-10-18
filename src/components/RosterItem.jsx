import React from 'react';
import { connect } from 'react-redux';
import { API } from '../store/actions.js';
// components
import Presence from './Presence.jsx';
import DisplayName from './DisplayName.jsx';
import DeleteFromRoster from './DeleteFromRoster.jsx';

function generateKey() {
  return Math.floor(Math.random() * (new Date().getTime()));
}

class RosterItem extends React.Component {
  render() {
    // console.log('rendering RosterItem');
    const {
      jid,
      name,
      email,
      company,
      onClick
    } = this.props;

    const deleteAction = API.Roster.remove(jid);
    return (
      <div className="item" data-jid={jid} onClick={onClick}>
        <DeleteFromRoster deleteAction={deleteAction} />
        <Presence jid={jid} />
        <DisplayName jid={jid} />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { jid } = props;
  return state.roster.byId[jid];
}

export default connect(mapStateToProps)(RosterItem);
