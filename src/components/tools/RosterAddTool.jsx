import React from 'react';
import { connect } from 'react-redux';
import { API } from '../../store/actions.js';

const RosterAddTool = ({ handler }) =>
  <button className="tool roster-add" onClick={ handler }></button>


export function mapDispatchToProps(dispatch, props) {
  return {
    handler: () => dispatch(API.UI.toggleWizard('rosterAdd'))
  }
}

export default connect(null, mapDispatchToProps)(RosterAddTool);
