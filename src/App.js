import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import styled from 'styled-components';

import InspectorPage from './pages/Inspector';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import ServiceOverviewPage from './pages/ServiceOverview';

const AppWrapper = styled.div`background: #f5f5f5;`;

const RouteContainer = styled(Paper)`
  margin: 20px;
  padding: 20px;
`;

class App extends Component {
  render() {
    return (
      <AppWrapper>
        <AppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit">
              Twilio Sync Inspector
            </Typography>
          </Toolbar>
        </AppBar>
        <Router>
          <RouteContainer elevation={2}>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/services" component={ServicesPage} />
            <Route
              exact
              path="/services/:sid"
              component={ServiceOverviewPage}
            />
            <Route
              exact
              path="/services/:serviceSid/:type/:sid"
              component={InspectorPage}
            />
          </RouteContainer>
        </Router>
      </AppWrapper>
    );
  }
}

export default App;
