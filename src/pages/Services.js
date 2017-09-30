import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import CachedIcon from 'material-ui-icons/Cached';

import SidList from '../components/SidList';

class ServicesPage extends Component {
  constructor() {
    super();
    this.onServicesSelected = this.onServicesSelected.bind(this);
    this.state = {
      entries: [],
      isLoaded: false
    };
  }

  async componentWillMount() {
    const resp = await fetch('/api/services');
    if (!resp.ok) {
      console.error(await resp.body());
      return;
    }
    const { services } = await resp.json();
    this.setState({
      entries: services,
      isLoaded: true
    });
  }

  onServicesSelected(service) {
    this.props.history.push(`/services/${service.sid}`);
  }

  render() {
    if (this.state.isLoaded) {
      return this.renderList();
    }

    return this.renderLoading();
  }

  renderList() {
    return (
      <div>
        <Typography type="headline">Sync Services</Typography>
        <SidList
          entries={this.state.entries}
          icon={<CachedIcon />}
          onSelect={this.onServicesSelected}
        />
      </div>
    );
  }

  renderLoading() {
    return (
      <div>
        <Typography type="headline">Loading Services</Typography>
        <LinearProgress color="accent" />
      </div>
    );
  }
}

export default ServicesPage;
