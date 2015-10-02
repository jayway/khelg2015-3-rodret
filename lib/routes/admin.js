'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  var companies = [
    { id: 1, name: 'Company 1' },
    { id: 2, name: 'Company 2' },
    { id: 3, name: 'Company 3' }
  ];

  res.render('pages/admin', {
    companies: companies
  });
});

module.exports = router;
