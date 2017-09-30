import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import FormatListNumberedIcon from 'material-ui-icons/FormatListNumbered';
import InsertDriveFileIcon from 'material-ui-icons/InsertDriveFile';
import AppsIcon from 'material-ui-icons/Apps';
import { LinearProgress } from 'material-ui/Progress';

import SidList from '../components/SidList';

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
        <Typography type="headline">
          Service <code>{sid}</code>
        </Typography>
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
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        <Typography type="headline">Loading Service</Typography>
        <LinearProgress />
      </div>
    );
  }
}

export default ServiceOverviewPage;
