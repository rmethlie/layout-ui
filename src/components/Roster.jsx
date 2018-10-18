import React from 'react';
import { connect } from 'react-redux';
// components
import RosterSidebar from './RosterSidebar.jsx';
import RosterItems from './RosterItems.jsx';
import Toolbar from './Toolbar.jsx';

class Roster extends React.Component {

  render() {
    const { show } = this.props;
    const rosterClass = show ? 'roster show' : 'roster hide';
    // console.log('rendering roster');
    return (
      <div className={rosterClass}>
        <Toolbar id="roster-toolbar" tools={this.getTools()}></Toolbar>
        <RosterItems />
        <RosterSidebar />
      </div>
    )
  }

  getTools() {
    return ['RosterAddTool', 'RosterRemoveTool'];
  }
}

function mapStateToProps(state) {
  return {
    show: state.ui.rosterShow
  };
}

export default connect(mapStateToProps)(Roster);
