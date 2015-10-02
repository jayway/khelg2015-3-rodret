'use strict';

var debug = require('debug')('travelway:app');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var appRouter = require('./routes/app');

// Middleware and routes are added with use
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/app', appRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));

function setupWebsockets(io) {
  // Listen to connection events
  io.on('connection', function(socket) {
    debug('Connection established');
    socket.on('traveller-event', function(data) {
      socket.broadcast.emit('traveller-event', data);
    });
  });
}

app.setupWebsockets = setupWebsockets;

module.exports = app;
