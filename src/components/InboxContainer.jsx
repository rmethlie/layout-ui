import React from 'react';
import { connect } from 'react-redux';
// components
import ContainerHeader from './ContainerHeader.jsx';
import Toolbar from './Toolbar.jsx';
// styles
import styles from '../styles.less';
class InboxContainer extends React.Component {

  render() {
    const { container } = this.props;
    const { title, type, id, items } = container;
    return (
      <div className="container inbox" data-container-type="inbox" data-container-id={id}>
        <ContainerHeader title={title}></ContainerHeader>
        <Toolbar id={id} tools={this.getTools()}></Toolbar>
      </div>
    )
  }

  getTools() {
    return ['CloseContainerTool']
  }
}

function mapStateToProps(state, props) {
  return {
    container: state.containers.byId[props.id]
  };
}

function mapDispatchToProps(dispatch, props) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxContainer);
