import React from 'react';
import { connect } from 'react-redux';

class AppConnection extends React.Component {
  render() {
    const { status } = this.props;
    return <div className={`connection ${status}`}></div>
  }
}

export function mapStateToProps(state, props) {
  return {
    status: state.connection.status.toLowerCase()
  };
}

export function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(AppConnection);
