import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import CachedIcon from 'material-ui-icons/Cached';

import SidList from '../components/SidList';

class ServiceOverviewPage extends Component {
  constructor() {
    super();
    this.onServicesSelected = this.onServicesSelected.bind(this);
  }

  onServicesSelected(service) {
    console.log(service);
  }

  render() {
    const { sid } = this.props.match.params;
    return (
      <div>
        <Typography type="headline">
          Service <code>{sid}</code>
        </Typography>
        <Typography type="subheading">Documents</Typography>
        <SidList
          entries={mockEntries}
          icon={<CachedIcon />}
          onSelect={this.onServicesSelected}
        />
        <Typography type="subheading">Maps</Typography>
        <SidList
          entries={mockEntries}
          icon={<CachedIcon />}
          onSelect={this.onServicesSelected}
        />
        <Typography type="subheading">Lists</Typography>
        <SidList
          entries={mockEntries}
          icon={<CachedIcon />}
          onSelect={this.onServicesSelected}
        />
      </div>
    );
  }
}

const mockEntries = [
  { sid: 'ISd14112cb34fed60d68e81bXXXXXXXXXX', uniqueName: 'some_name' },
  { sid: 'ISd14112cb34fed60d68e81bXXXXXXXXXY', uniqueName: 'some_name1' },
  { sid: 'ISd14112cb34fed60d68e81bXXXXXXXXXZ', uniqueName: 'some_name2' }
];

export default ServiceOverviewPage;
