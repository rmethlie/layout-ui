import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { API } from '../store/actions.js';

class PresenceCount extends React.Component {

  render() {
    const { presence, count, filter, togglePresenceFilter } = this.props;
    const isFilterActive = !!filter;
    const isActiveFilter = filter === presence;
    const classNames = ['presence-count', presence];
    this.noAnimation = false;
    if (isActiveFilter) {
      this.noAnimation = true;
      classNames.push('active');
    } else if (isFilterActive) {
      this.noAnimation = true;
      classNames.push('inactive');
    }
    return (
      <div
        title={presence}
        onClick={togglePresenceFilter}
        className={classNames.join(' ')}
      >{count}</div>
    );
  }

  componentDidUpdate() {
    if (this.noAnimation) {
      return;
    }
    this.addAnimation();
    setTimeout(this.removeAnimation.bind(this), 500);
  }

  addAnimation() {
    ReactDOM.findDOMNode(this).style.animationName = 'glow';
  }

  removeAnimation() {
    ReactDOM.findDOMNode(this).style.animationName = '';
  }
}

function mapStateToProps(state, props) {
  const { presence } = props;
  const { filter } = state.roster;
  const count = presence === 'all' ?
    state.roster.all.length :
    state.presence.counts[presence];
  return {
    count,
    presence,
    filter
  }
}

function mapDispatchToProps(dispatch, { presence, filter }) {
  return {
    togglePresenceFilter: (event) => {
      event.stopPropagation();
      const presenceFilter = !!filter ? '' : presence;
      dispatch(API.Roster.filter(presenceFilter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PresenceCount);
