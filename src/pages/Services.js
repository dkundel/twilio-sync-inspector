import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import CachedIcon from 'material-ui-icons/Cached';

import SidList from '../components/SidList';

class ServicesPage extends Component {
  constructor() {
    super();
    this.onServicesSelected = this.onServicesSelected.bind(this);
  }

  onServicesSelected(service) {
    console.log(service);
  }

  render() {
    return (
      <div>
        <Typography type="headline">Sync Services</Typography>
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

export default ServicesPage;
