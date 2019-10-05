// https://devcenter.heroku.com/articles/getting-started-with-nodejs

// ! === IMPORT OWN FILES
const serverFunctions = require('./lib/serverFunctions.js');

// ! === EXPRESS SERVER
const express = require('express');
const server = express();
const port = 5000;
server.use(express.static('public'));

// ! === EXPRESS ROUTER
const router = require('./router');
server.use('/', router);

// ! === SERVER LISTEN
server.listen(port, err => {
  serverFunctions.notifyServerIsRunning(port, err);
});
