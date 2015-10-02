'use strict';

var express = require('express');
var router = express.Router();
var sapData = require('../../data/sap/companies.json');

router.get('/', function(req, res) {
  res.render('pages/admin', sapData);
});

module.exports = router;
