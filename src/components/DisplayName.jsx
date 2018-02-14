import React from 'react';
import { connect } from 'react-redux';

const DisplayName = ({ jid, name }) =>
  <div data-jid={jid} className="display-name">{name}</div>;


function mapStateToProps(state, props) {
  const { jid } = props;
  return state.roster.byId[jid];
}

export default connect(mapStateToProps)(DisplayName);
