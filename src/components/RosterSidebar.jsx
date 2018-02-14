import React from 'react';
import { connect } from 'react-redux';
import { API } from '../store/actions.js';
// components
import PresenceCount from './PresenceCount.jsx';

class RosterSidebar extends React.Component {
  constructor() {
    super();
    this.toggleRoster = this.toggleRoster.bind(this);
  }

  toggleRoster() {
    this.props.toggleRoster();
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    const { total } = this.props;
    return (
      <div onClick={this.toggleRoster} className="sidebar">
        <div className="presence-counts">
          <PresenceCount presence="all" />
          <PresenceCount presence="available" />
          <PresenceCount presence="unavailable" />
          <PresenceCount presence="dnd" />
          <PresenceCount presence="away" />
          <PresenceCount presence="email" />
          <PresenceCount presence="unknown" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    show: state.ui.rosterShow,
    total: state.roster.all.length
  }
}

function mapDispatchToProps(dispatch, props) {
  return {
    toggleRoster: () => {
      dispatch(API.UI.toggleRoster())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RosterSidebar);
