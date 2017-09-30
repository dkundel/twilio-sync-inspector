import React, { Component } from 'react';
import styled from 'styled-components';

import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';

import FormatListNumberedIcon from 'material-ui-icons/FormatListNumbered';
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile';
import AppsIcon from 'material-ui-icons/Apps';
import HomeIcon from 'material-ui-icons/Home';

import { NavEntry, NavEntryContainer } from '../components/NavEntry';
import SidList from '../components/SidList';

const ListsWrapper = styled.div`margin-top: 20px;`;

class ServiceOverviewPage extends Component {
  constructor() {
    super();

    this.state = {
      documents: [],
      maps: [],
      lists: [],
      isLoaded: false
    };

    this.onDocumentSelected = this.onDocumentSelected.bind(this);
    this.onMapSelected = this.onMapSelected.bind(this);
    this.onListSelected = this.onListSelected.bind(this);
  }

  async componentWillMount() {
    const serviceSid = this.props.match.params.sid;
    const resp = await fetch(`/api/services/${serviceSid}`);
    if (!resp.ok) {
      console.error(await resp.body());
      return;
    }
    const { documents, maps, lists } = await resp.json();
    this.setState({
      documents,
      maps,
      lists,
      serviceSid,
      isLoaded: true
    });
  }

  onDocumentSelected(document) {
    this.navigateTo('document', document.sid);
  }

  onMapSelected(map) {
    this.navigateTo('map', map.sid);
  }

  onListSelected(list) {
    this.navigateTo('list', list.sid);
  }

  navigateTo(type, sid) {
    const { serviceSid } = this.state;
    this.props.history.push(`/services/${serviceSid}/${type}/${sid}`);
  }

  render() {
    if (this.state.isLoaded) {
      return this.renderLists();
    } else {
      return this.renderLoading();
    }
  }

  renderLists() {
    const sid = this.state.serviceSid;
    return (
      <div>
        <NavEntryContainer>
          <NavEntry href="/services" icon={<HomeIcon />} label="All Services" />
        </NavEntryContainer>
        <Typography type="headline">
          Service <code>{sid}</code>
        </Typography>
        <ListsWrapper>
          <Typography type="subheading">Documents</Typography>
          <SidList
            entries={this.state.documents}
            icon={<InsertDriveFileIcon />}
            onSelect={this.onDocumentSelected}
          />
          <Typography type="subheading">Maps</Typography>
          <SidList
            entries={this.state.maps}
            icon={<AppsIcon />}
            onSelect={this.onMapSelected}
          />
          <Typography type="subheading">Lists</Typography>
          <SidList
            entries={this.state.lists}
            icon={<FormatListNumberedIcon />}
            onSelect={this.onListSelected}
          />
        </ListsWrapper>
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        <NavEntryContainer>
          <NavEntry href="/services" icon={<HomeIcon />} label="All Services" />
        </NavEntryContainer>
        <Typography type="headline">Loading Service</Typography>
        <LinearProgress color="accent" />
      </div>
    );
  }
}

export default ServiceOverviewPage;
