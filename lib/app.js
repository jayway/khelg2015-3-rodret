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
var Traveller = require('./models/traveller')
var Company = require('./models/company')

var mongoUrl = process.env.MONGOLAB_URI ||'mongodb://@localhost:27017/express-lab-dev';
var db = mongoskin.db(mongoUrl, {safe:true});

var trip = new MongoTrip(db);

var traveller = new Traveller(db);
var company = new Company(db);

var eventsModel = new MongoEvent(db);

var app = express();

// Middleware and routes are added with use
app.set('view engine', 'ejs');
var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var appRouter = require('./routes/app');
var eventRouter = require('./routes/events');
var travellerRouter = require('./routes/traveller');
var companyRouter = require('./routes/company');
// Middleware and routes are added with use
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/app', appRouter(eventsModel));
app.use('/trips', tripsRouter(trip));
app.use('/travel-events', eventRouter(eventsModel));
app.use('/travellers', travellerRouter(traveller));
app.use('/companies', companyRouter(company));

app.use(express.static(path.join(__dirname, '..', 'public')));

function setupWebsockets(io) {
  // Listen to connection events
  io.on('connection', function(socket) {
    eventsModel.on('error', function logError(message) {
      console.log('EventError', message);
    });
    debug('Connection establish:ed');
    ['added', 'removed', 'updated', 'error'].forEach(function(event) {
      eventsModel.on(event, function(object) {
        debug(event, object);
        socket.emit('travel-event:' + event, object);
      });
    });
  });
}

app.setupWebsockets = setupWebsockets;

module.exports = app;
