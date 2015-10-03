'use strict';

var express = require('express');
var router = express.Router();
var sapData = require('../../data/sap/companies.json');

router.get('/', function (req, res) {
  res.render('pages/admin', sapData);
});

router.get('/trip/:name', function (req, res) {
  res.render('pages/trip', {
    members: []
  });
});

module.exports = router;
