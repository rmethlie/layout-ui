import React from 'react';
import { connect } from 'react-redux';
// components
import RosterItem from './RosterItem.jsx';
import { createSelector } from 'reselect';

function generateKey() {
  return Math.floor(Math.random() * (new Date().getTime()));
}

class RosterItems extends React.Component {

  constructor() {
    super();
    this.onRosterItemClick = this.onRosterItemClick.bind(this);
    this.mapJidToComponent = this.mapJidToComponent.bind(this);
    console.log('creating RosterItems');
  }
  render() {
    const filteredItems = this.getFilteredItems();
    return (
      <div className="items">
        {filteredItems.map(this.mapJidToComponent)}
          </div>
        );
  }

  mapJidToComponent(jid) {
    return <RosterItem key={generateKey()} jid={jid} onClick={this.onRosterItemClick} />;
  }

  onRosterItemClick(event) {
    const jid = event.target.getAttribute('data-jid');
    console.log('starting conversation from click:', jid);
    this.props.startConversationFromClick(jid);
  }

  getFilterFunction(filterType) {
    const { items, filter, presence } = this.props;
    switch (filter) {
      case 'unavailable':
      case 'available':
      case 'away':
      case 'dnd':
      case 'unknown':
      case 'email':
        return (jid) => {
          const itemPresence = presence.byId[jid];
          return itemPresence && itemPresence.presence === filter;
        }
      default: return null;
    }
  }

  getFilteredItems() {
    const { items } = this.props;
    const filterFunction = this.getFilterFunction();
    if (filterFunction) {
      return items.filter(filterFunction);
    }

    return items;
  }

  componentWillUnmount() {
    console.log('unmounting RosterItems');
  }
}

function mapStateToProps(state, props) {
  const { filter, all } = state.roster;
  const presence = state.presence;
  return {
    filter,
    items: all,
    presence
  }
}

function mapDispatchToProps(dispatch) {
  return {
    startConversationFromClick: (jid) => {
      dispatch({
        type: 'API.CONVERSATIONS.OPEN',
        data: {
          type: 'CHAT',
          jid
        }
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RosterItems);
