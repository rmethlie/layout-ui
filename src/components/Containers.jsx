import React from 'react';
import { connect } from 'react-redux';
// components
import Container from './Container.jsx';

const mapContainersToComponents = containers =>
  Object.keys(containers)
    .map(id =>
      <Container
        key={id}
        id={id}
        type={containers[id].type}
      ></Container>
    );

class Containers extends React.Component {

  render() {
    const { containers } = this.props;
    return (
      <div className="containers">
        {mapContainersToComponents(containers)}
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    containers: state.containers.byId
  };
}

export default connect(mapStateToProps)(Containers);
