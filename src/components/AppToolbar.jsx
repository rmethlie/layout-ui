import React from 'react';
import ContainersActions from '../store/actions/containers.actions';
import { connect } from 'react-redux';

class AppToolbar extends React.Component {
  constructor() {
    super();
    this.bindTools();
  }

  bindTools() {

  }

  render() {
    const {addContainer} = this.props;
    return (
      <div className="toolbar">
        <div>ROSTER</div>
        <div className="tool" onClick={addContainer}>Add Container</div>
      </div>
    )
  }
}

export function mapStateToProps(state, props) {
  return {};
}

export function mapDispatchToProps(dispatch, props) {
  return {
    addContainer: () => {
      dispatch(ContainersActions.API.add());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppToolbar);
