'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  event.find(null, function(err, events) {
    res.render('pages/app', {events: events});
  });
});

var event;
function appRouter(eventModel) {
    event = eventModel;
    return router;
}

module.exports = appRouter;
