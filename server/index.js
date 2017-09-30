const express = require('express');
const path = require('path');
const debug = require('debug')('twilio-sync-inspector:server');

const defaultConfig = require('./config.default');
const apiRoutes = require('./api');

function startServer(userConfig) {
  debug('Passed config: %O', userConfig);
  const config = { ...defaultConfig, ...userConfig };
  debug('Working with config: %O', config);

  debug('Create server');
  const app = express();

  app.use('/api', apiRoutes);

  if (!config.dev) {
    const buildFiles = path.join(__dirname, '..', 'build');
    debug('Serving files from %s', buildFiles);
    app.use(express.static(buildFiles));
    app.get('*', (req, res) => {
      res.sendFile(path.join(buildFiles, 'index.html'));
    });
  }

  app.listen(config.port, () => {
    debug('Server listening on port %d', config.port);
  });
}

module.exports = startServer;
