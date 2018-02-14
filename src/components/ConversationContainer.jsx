import React from 'react';
import { connect } from 'react-redux';
// components
// styles
class ConversationContainer extends React.Component {

  render() {
    const { container } = this.props;
    const { title, type, id } = container;
    return (
      <div className="container conversation" data-container-type="conversation" data-container-id={id}>
        {title}
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(ConversationContainer);
