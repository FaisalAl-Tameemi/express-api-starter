/**
 * What's this file for?
 * This is the main application file which runs the server using express
 * and calls the necessary files.
 */

'use strict';

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
const app = express();
const server = http.createServer(app);

// // note: SocketIO suport disabled but configured.
// const socketio = require('socket.io')(server, {
//   serveClient: config.env !== 'production',
//   path: '/socket.io-client'
// });
// // require socket.io configs for each endpoint
// require('./config/socketio')(socketio);

// require the file which has all the express server configs such as middleware
// pass app to it such that it has the server referance when it's settings configs and middleware
require('./config/express')(app);
// set up the server routes for each endpoint, see `/api/.../index.js` to see each endpoint's routes
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

// note: add `{force: true}` to the .sync() call to erase the DB and restart completely
sqldb.sequelize.sync()
  .then(startServer)
  .catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
  });

// Expose app
exports = module.exports = app;
