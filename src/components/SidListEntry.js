import React, { Component } from 'react';

import { ListItem, ListItemText, ListItemIcon } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import RightArrowIcon from 'material-ui-icons/KeyboardArrowRight';

import { twilioRed } from '../utils/theme';

class SidListEntry extends Component {
  render() {
    const { icon, name, sid, onClick } = this.props;
    return (
      <ListItem button onClick={onClick}>
        <Avatar style={{ backgroundColor: twilioRed[500] }}>{icon}</Avatar>
        <ListItemText primary={`'${name}'`} secondary={sid} />
        <ListItemIcon>
          <RightArrowIcon />
        </ListItemIcon>
      </ListItem>
    );
  }
}

export default SidListEntry;
