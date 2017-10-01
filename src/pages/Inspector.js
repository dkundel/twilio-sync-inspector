import React, { Component } from 'react';
import JsonView from 'react-json-view';
import styled from 'styled-components';

import Typography from 'material-ui/Typography';
import { LinearProgress } from 'material-ui/Progress';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

import CachedIcon from 'material-ui-icons/Cached';
import HomeIcon from 'material-ui-icons/Home';

import { NavEntry, NavEntryContainer } from '../components/NavEntry';
import SyncClient from '../services/sync';

const InspectorWrapper = styled(Paper)`
  margin: 10px;
  padding: 20px;
  overflow-y: scroll;
`;

const ItemNumberInput = styled.div`
  display: ${props => (props.show ? 'flex' : 'none')};
  align-items: flex-end;
`;

const MarginLeft = styled.div`margin-left: 20px;`;

const ReloadButton = styled(Button)`margin-bottom: 10px;`;

class InspectorPage extends Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
      isLoaded: false,
      itemCount: 50,
      order: 'desc',
      newSearchValue: false
    };

    this.handleEdit = this.handleEdit.bind(this);
    this.handleItemsCountChange = this.handleItemsCountChange.bind(this);
    this.handleOrderChange = this.handleOrderChange.bind(this);
    this.triggerLoadNewItems = this.triggerLoadNewItems.bind(this);
  }

  async componentWillMount() {
    const { serviceSid, type, sid } = this.props.match.params;
    const { itemCount, order } = this.state;
    const client = SyncClient.shared();
    client.on('updated', data => {
      this.setState({ data, isLoaded: true });
    });
    client.on('removed', () => {
      this.props.history.push('/services/' + serviceSid);
    });
    const data = await client.load(serviceSid, type, sid, { itemCount, order });
    this.setState({ data, isLoaded: true });
  }

  handleEdit(editInfo) {
    return SyncClient.shared().handleEdit(editInfo);
  }

  handleItemsCountChange(evt) {
    const itemCount = parseInt(evt.target.value, 10);
    this.setState({ itemCount, newSearchValue: true });
  }

  handleOrderChange(evt) {
    const order = evt.target.value;
    this.setState({ order, newSearchValue: true });
  }

  async triggerLoadNewItems() {
    this.setState({ isLoaded: false, newSearchValue: false });
    const client = SyncClient.shared();
    client.setItemSearchConfig(this.state.itemCount, this.state.order);
    client.triggerRefresh();
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
        <ItemNumberInput show={type !== 'document'}>
          <TextField
            id="number"
            label="Number of items"
            value={this.state.itemCount}
            onChange={this.handleItemsCountChange}
            type="number"
            margin="normal"
            disabled={!this.state.isLoaded}
          />
          <MarginLeft>
            <FormControl margin="normal">
              <InputLabel htmlFor="order-picker">Age</InputLabel>
              <Select
                native
                value={this.state.order}
                onChange={this.handleOrderChange}
                input={<Input id="order-picker" />}
                disabled={!this.state.isLoaded}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </FormControl>
          </MarginLeft>
          <MarginLeft>
            <ReloadButton
              onClick={this.triggerLoadNewItems}
              disabled={!this.state.newSearchValue}
              color="primary"
              raised
            >
              Load
            </ReloadButton>
          </MarginLeft>
        </ItemNumberInput>
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
