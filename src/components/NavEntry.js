import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from 'styled-components';

import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

export const NavEntryContainer = styled.div`
  margin-top: 0px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
`;

const Link = styled(RouterLink)`margin-right: 20px;`;

export class NavEntry extends Component {
  render() {
    const { icon, label, href } = this.props;
    return (
      <Link to={href}>
        <Chip
          avatar={<Avatar>{icon}</Avatar>}
          label={label}
          onClick={() => {}}
        />
      </Link>
    );
  }
}

export default NavEntry;
