'use strict';

var debug = require('debug')('express-lab:app');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var app = express();

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var appRouter = require('./routes/app');
var statusRouter = require('./routes/status');
var booksRouter = require('./routes/books');
var MongoBook = require('./models/mongo-book');
var mongoskin = require('mongoskin');
var db = mongoskin.db('mongodb://@localhost:27017/express-lab-dev', {safe:true});

var book = new MongoBook(db);

var app = express();

// Middleware and routes are added with use
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/app', appRouter);

app.use('/status', statusRouter);
app.use('/books', booksRouter(book));
app.use(express.static(path.join(__dirname, '..', 'public')));

module.exports = app;
