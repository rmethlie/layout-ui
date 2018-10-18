import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// components
import ContainerActions from '../store/actions/containers.actions';
import InboxContainer from './InboxContainer.jsx';
import ConversationContainer from './ConversationContainer.jsx';
import DefaultContainer from './DefaultContainer.jsx';

const styles = {
  borderStyle: 'solid',
  borderWidth: '1px',
  borderColor: 'transparent',
  backgroundColor: 'transparent'
};

const containerTypes = {
  inbox: InboxContainer,
  conversation: ConversationContainer,
  default: DefaultContainer
}

function calculateBorderColor(active, highlight) {
  if (highlight) {
    return '#fff';
  }

  if (active) {
    return '#ff7700';
  }

  return styles.borderColor;
}

function calculateBackgroundColor(active, highlight) {
  if (active) {
    return 'rgba(100, 100, 100, 0.5)';
  }
  return styles.backgroundColor;
}

// styles
class Container extends React.Component {
  render() {
    const { id, type, active, activate } = this.props;
    const ContainerComponent = containerTypes[type];
    const calculatedStyles = Object.assign({}, styles, {
      // borderColor: calculateBorderColor(active),
      backgroundColor: calculateBackgroundColor(active),
      flexGrow: active ? '2' : '',
      width: active ? '600px' : '300px'
    });
    return (
      <div className="container-wrapper" onClick={activate} style={calculatedStyles}>
        <ContainerComponent id={id}></ContainerComponent>
      </div>
    )
  }
}

Container.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  active: PropTypes.bool.isRequired,
  activate: PropTypes.func.isRequired
};

Container.defaultProps = {
  type: 'conversation'
}

function mapStateToProps(state, props) {
  const {id} = props;
  const container = state.containers.byId[id];
  const active = state.containers.active === id;
  const {type} = container;
  return { id, type, active };
}

function mapDispatchToProps(dispatch, props) {
  const {id} = props;
  return {
    activate: () => {
      dispatch(ContainerActions.Store.activate(id));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);
