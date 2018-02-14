import React from 'react';
import { connect } from 'react-redux';
// components
import InboxContainer from './InboxContainer.jsx';
import ConversationContainer from './ConversationContainer.jsx';

const containerTypes = {
  inbox: InboxContainer,
  conversation: ConversationContainer
}
// styles
class Container extends React.Component {

  render() {
    const { id, type } = this.props;
    const ContainerComponent = containerTypes[type] || Container;
    return <ContainerComponent id={id}></ContainerComponent>
  }
}

export default Container;
