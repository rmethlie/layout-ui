import React from 'react';
import { connect } from 'react-redux';
import { API } from '../../store/actions.js';

const RosterRemoveTool = ({ handler }) =>
  <button className="tool roster-remove" onClick={ handler }></button>


export function mapDispatchToProps(dispatch, props) {
  return {
    handler: () => dispatch(API.UI.toggleRosterDelete())
  }
}

export default connect(null, mapDispatchToProps)(RosterRemoveTool);
