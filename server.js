'use strict';

var debug = require('debug')('express-lab:server');
var http = require('http');
var app = require('./lib/app');
var server = http.createServer(app);
var io = require('socket.io')(server);

// Set rendering engine
app.set('view engine', 'ejs');

// Make sure uncaught exceptions are logged on exit
process.on('uncaughtException', function(err) {
  console.log("Uncaught exception", err, err.stack);
  process.exit(1);
});

// app.setupWebsockets(io);

server.app = app;
server.start = start;

module.exports = server;

start();

function environment() {
  return process.env.NODE_ENV || 'development';
}

function isProduction() {
  return environment() === 'production';
}

function start() {
  var port = process.env.PORT || 3000;

  server.listen(port, function() {
    console.log(environment().toUpperCase() + ' server started');
    console.log('Port:', port);
    console.log('URL:', 'http://localhost:' + port);
  });
}
