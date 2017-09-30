import React, { Component } from 'react';

import List, { ListItem, ListItemText } from 'material-ui/List';

import SidListEntry from './SidListEntry';

class SidList extends Component {
  render() {
    const { icon, entries, onSelect } = this.props;
    return (
      <List>
        {entries.map(entry => (
          <SidListEntry
            sid={entry.sid}
            name={entry.uniqueName}
            icon={icon}
            key={entry.sid}
            onClick={function() {
              onSelect(entry);
            }}
          />
        ))}
        {entries.length === 0 && (
          <ListItem disabled>
            <ListItemText primary="No entries" />
          </ListItem>
        )}
      </List>
    );
  }
}

export default SidList;
