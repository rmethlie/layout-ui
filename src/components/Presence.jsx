import React from 'react';
import { connect } from 'react-redux';

const Presence = ({ jid, presence }) =>
  <div data-jid={jid} className={`presence ${presence}`}></div>;


function mapStateToProps(state, props) {
  const { jid } = props;
  const item = state.presence.byId[jid] || {
    jid,
    presence: 'unknown'
  };
  return item;
}

export default connect(mapStateToProps)(Presence);
