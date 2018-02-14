import React from 'react';
import { connect } from 'react-redux';

class DeleteFromRoster extends React.Component {

  constructor() {
    super();
    this.state = {
      checkState: false
    };
    this.toggleCheckState = this.toggleCheckState.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.checkState !== this.state.checkState) {
      return true;
    }

    if (nextProps.show !== this.props.show) {
      return true;
    }

    return false;
  }

  toggleCheckState() {
    this.setState({
      checkState: !this.state.checkState
    });
  }

  render() {
    // console.log('rendering DeleteFromList');
    const { dispatchDelete, show } = this.props;
    if (!show) this.state.checkState = false;
    const { checkState } = this.state;
    const classNames = ['delete-from-roster'];
    if (checkState) classNames.push('checked');
    if (show) classNames.push('show');
    if (checkState) {
      const confirmStyles = {
        display: 'inline-block',
        width: '46px',
        margin: '0'
      };
      return (
        <div style={confirmStyles}>
          <div
            onClick={dispatchDelete}
            className="delete-from-roster-confirm"
          >y</div>
          <div
            onClick={this.toggleCheckState}
            className="delete-from-roster-cancel"
          >n</div>
        </div>
      );
    }
    return <div onClick={this.toggleCheckState} className={classNames.join(' ')}>delete</div>;
  }
}
function mapDispatchToProps(dispatch, { deleteAction }) {
  return {
    dispatchDelete: () => {
      console.log('dispatchDelete', deleteAction);
      dispatch(deleteAction);
    }
  }
}

function mapStateToProps(state) {
  return {
    show: state.ui.showRosterDelete
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteFromRoster);
