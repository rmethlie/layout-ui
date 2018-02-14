import React from 'react';
import { connect } from 'react-redux';
// components
import AppToolbar from './AppToolbar.jsx';
import AppConnection from './AppConnection.jsx';

class AppHeader extends React.Component {
  render() {
    return (
      <div className="header">
        <div className="title">{this.props.title}</div>
        <AppToolbar />
        <AppConnection />
      </div>
    );
  }
}

function mapState(state, props) {
  return {
    title: 'Match Maker'
  };
}

function mapDispatch(state, dispatch) {
  return {};
}

export default connect(mapState, mapDispatch)(AppHeader);
