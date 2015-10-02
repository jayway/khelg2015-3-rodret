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
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/trips', tripsRouter(trip));
app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
