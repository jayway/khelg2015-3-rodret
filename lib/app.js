'use strict';

var debug = require('debug')('express-lab:app');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();
var tripsRouter = require('./routes/trips.js')
var MongoTrip = require('./models/trip-proposal');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/express-lab-dev', {safe:true});

var trip = new MongoTrip(db);

var app = express();

// Middleware and routes are added with use
app.set('view engine', 'ejs');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var appRouter = require('./routes/app');

// Middleware and routes are added with use
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/app', appRouter);
app.use('/trips', tripsRouter(trip));

app.use(express.static(path.join(__dirname, '..', 'public')));

function setupWebsockets(io) {
  /*
  debug('setupWebsockets');

  book.on('error', function logError(message) {
    console.log('BookError', message);
  });

  // Listen to connection events
  io.on('connection', function(socket) {
    debug('Connection established');
    book.books.forEach(function(b) {
      socket.emit('book:added', b);
    });

    ['added', 'removed', 'updated', 'error'].forEach(function(event) {
      book.on(event, function(object) {
        debug(event, object);
        socket.emit('book:' + event, object);
      });
    });
  });
  */
}

// app.setupWebsockets = setupWebsockets;

module.exports = app;
