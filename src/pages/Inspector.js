import React, { Component } from 'react';
import JsonView from 'react-json-view';
import styled from 'styled-components';

import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';

import CachedIcon from 'material-ui-icons/Cached';
import HomeIcon from 'material-ui-icons/Home';

import { NavEntry, NavEntryContainer } from '../components/NavEntry';
import SyncClient from '../services/sync';

const InspectorWrapper = styled(Paper)`
  margin: 10px;
  padding: 20px;
  overflow-y: scroll;
`;

class InspectorPage extends Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
      isLoaded: false
    };

    this.handleEdit = this.handleEdit.bind(this);
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
    const data = await client.load(serviceSid, type, sid);
    this.setState({ data, isLoaded: true });
  }

  handleEdit(editInfo) {
    return SyncClient.shared().handleEdit(editInfo);
  }

  render() {
    const { serviceSid, type, sid } = this.props.match.params;
    return (
      <div>
        <NavEntryContainer>
          <NavEntry href="/services" icon={<HomeIcon />} label="All Services" />
          <NavEntry
            href={`/services/${serviceSid}`}
            icon={<CachedIcon />}
            label={'Service ' + sid}
          />
        </NavEntryContainer>
        <Typography type="headline">
          {normalizeText(type)} <code>({sid})</code>
        </Typography>
        {this.state.data ? (
          <InspectorWrapper elevation={6}>
            <JsonView
              src={this.state.data}
              collapsed={2}
              theme="summerfruit:inverted"
              onEdit={this.handleEdit}
            />
          </InspectorWrapper>
        ) : (
          <LinearProgress color="accent" />
        )}
      </div>
    );
  }
}

function normalizeText(text) {
  return text[0].toUpperCase() + text.substr(1);
}

export default InspectorPage;
