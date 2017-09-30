import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';

import AppBar from 'material-ui/AppBar';
import Button from 'material-ui/Button';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import { MuiThemeProvider } from 'material-ui/styles';

import CodeIcon from 'material-ui-icons/Code';

import Footer from './components/Footer';

import InspectorPage from './pages/Inspector';
import HomePage from './pages/Home';
import ServicesPage from './pages/Services';
import ServiceOverviewPage from './pages/ServiceOverview';

import theme from './utils/theme';

const AppWrapper = styled.div`background: #f5f5f5;`;

const RouteContainer = styled(Paper)`
  margin: 20px;
  padding: 20px;
`;

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <AppWrapper>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography type="title" color="inherit" style={{ flex: 1 }}>
                Twilio Sync Inspector
              </Typography>
              <Button
                target="_blank"
                href="https://github.com/dkundel/twilio-sync-inspector"
                dense={true}
                color="contrast"
              >
                <CodeIcon style={{ marginRight: 10 }} />
                View Code on GitHub
              </Button>
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
          <Footer />
        </AppWrapper>
      </MuiThemeProvider>
    );
  }
}

export default App;
