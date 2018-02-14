import React from 'react';
import { connect } from 'react-redux';

class AppToolbar extends React.Component {
  constructor() {
    super();
    this.bindTools();
  }

  bindTools() {

  }

  render() {
    return (
      <div className="toolbar">
        <div>ROSTER</div>
      </div>
    )
  }
}

export function mapStateToProps(state, props) {
  return {};
}

export function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);
