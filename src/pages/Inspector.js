import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import JsonView from 'react-json-view';

class InspectorPage extends Component {
  constructor() {
    super();
    this.onServicesSelected = this.onServicesSelected.bind(this);
  }

  onServicesSelected(service) {
    console.log(service);
  }

  render() {
    const { serviceSid, type, sid } = this.props.match.params;
    return (
      <div>
        <Typography type="headline">
          {type} <code>{sid}</code>
        </Typography>
        <JsonView src={mockEntries} />
      </div>
    );
  }
}

const mockEntries = [
  { sid: 'ISd14112cb34fed60d68e81bXXXXXXXXXX', uniqueName: 'some_name' },
  { sid: 'ISd14112cb34fed60d68e81bXXXXXXXXXY', uniqueName: 'some_name1' },
  { sid: 'ISd14112cb34fed60d68e81bXXXXXXXXXZ', uniqueName: 'some_name2' }
];

export default InspectorPage;
