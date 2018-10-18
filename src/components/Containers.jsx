import React from 'react';
import { connect } from 'react-redux';
// components
import Container from './Container.jsx';

const mapChildrenToComponents = children =>
  Object.keys(children)
    .map(id =>
      <Container
        key={id}
        id={id}
      ></Container>
    );

class Containers extends React.Component {

  render() {
    const { children } = this.props;
    return (
      <div className="containers">
        {mapChildrenToComponents(children)}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    children: state.containers.byId
  };
}

export default connect(mapStateToProps)(Containers);
