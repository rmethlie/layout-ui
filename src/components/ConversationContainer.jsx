import React from 'react';
import Conversation from './Conversation.jsx';
import { connect } from 'react-redux';
// components
// styles

function mapItemsToConversations(items, active) {
  return items.map((item) => {
    return (
      <Conversation
        key={item}
        id={item}
        active={(active === item)}
      ></Conversation>
    )
  });
}

class ConversationContainer extends React.Component {

  render() {
    const {id, activeItem, items, title} = this.props;
    return (
      <div
        className="container conversation"
        data-container-type="conversation"
        data-container-id={id}
      >
        <div className="title">{title}</div>
        <div className="items">
          {mapItemsToConversations(items, activeItem)}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const {id} = props;
  const container = state.containers.byId[id];
  const {activeItem, items, title} = container;
  return {
    id,
    items,
    activeItem,
    title
  };
}

export default connect(mapStateToProps)(ConversationContainer);
