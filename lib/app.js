'use strict';

var debug = require('debug')('express-lab:app');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var tripsRouter = require('./routes/trips.js')
var MongoTrip = require('./models/trip-proposal');
var MongoEvent = require('./models/mongo-events');
var mongoskin = require('mongoskin');

var db = mongoskin.db('mongodb://@localhost:27017/express-lab-dev', {safe:true});

var trip = new MongoTrip(db);

var eventsModel = new MongoEvent(db);

var app = express();

// Middleware and routes are added with use
app.set('view engine', 'ejs');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var appRouter = require('./routes/app');
var eventRouter = require('./routes/events');
// Middleware and routes are added with use
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/app', appRouter);
app.use('/trips', tripsRouter(trip));
app.use('/traveller-events', eventRouter(eventsModel));

app.use(express.static(path.join(__dirname, '..', 'public')));

function setupWebsockets(io) {
  // Listen to connection events
  io.on('connection', function(socket) {
    debug('Connection established');
    socket.on('traveller-event', function(data) {
      socket.broadcast.emit('traveller-event', data);
      ['added', 'removed', 'updated', 'error'].forEach(function(event) {
        eventsModel.on(event, function(object) {
          debug(event, object);
          socket.emit('traveller-event:' + event, object);
        });
      });
    });
  });
}

app.setupWebsockets = setupWebsockets;

module.exports = app;
