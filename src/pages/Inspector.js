import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import JsonView from 'react-json-view';

import SyncClient from '../services/sync';

class InspectorPage extends Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
      isLoaded: false
    };
  }

  async componentWillMount() {
    const { serviceSid, type, sid } = this.props.match.params;
    const client = SyncClient.shared();
    client.on('updated', data => {
      this.setState({ data });
    });
    client.on('removed', () => {
      this.props.history.push('/services/' + serviceSid);
    });
    client.on('disconnected', () => {
      this.props.history.push('/services/' + serviceSid);
    });
    const data = await client.load(serviceSid, type, sid);
    this.setState({ data, isLoaded: true });
  }

  render() {
    const { serviceSid, type, sid } = this.props.match.params;
    return (
      <div>
        <Typography type="headline">
          {type} <code>{sid}</code>
        </Typography>
        {this.state.data ? (
          <JsonView src={this.state.data} />
        ) : (
          <LinearProgress />
        )}
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
