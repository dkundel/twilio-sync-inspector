import React, { Component } from 'react';

import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';

class SidListEntry extends Component {
  render() {
    const { icon, name, sid, onClick } = this.props;
    return (
      <ListItem button onClick={onClick}>
        <Avatar>{icon}</Avatar>
        <ListItemText primary={name} secondary={sid} />
        <ListItemIcon>
          <RightArrowIcon />
        </ListItemIcon>
      </ListItem>
    );
  }
}

export default SidListEntry;
