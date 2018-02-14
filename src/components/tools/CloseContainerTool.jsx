import React from 'react';
import { connect } from 'react-redux';
import { API } from '../../store/actions.js';

const CloseContainerTool = ({ id, handler }) =>
  <button className="tool close-container" data-id={id} onClick={ handler }></button>


export function mapDispatchToProps(dispatch, props) {
  return {
    closeContainer: () => dispatch(API.Containers.close(props.id))
  }
}

export default connect(null, mapDispatchToProps)(CloseContainerTool);
