'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    company.find(req.query.filter, function(err, companys) {
        if (err)
            return res.status(500).send(err);
        return res.send(companys);
    });
});

router.get('/name/:name', function(req, res){
    company.findByName(req.params.name, function(err, company){
        if (err)
            return res.status(404).send(err);
        return res.send(company);
    });
});



router.get('/:id', function(req, res) {
    company.findById(req.params.id, function(err, company) {
        if (err)
            return res.status(404).send(err);
        return res.send(company);
    });
});

router.post('/', function(req, res) {
    company.add(req.body, function(err, id) {
        if (err)
            return res.status(500).send(err);
        return res.status(201).json(id);
    });
});

router.put('/:id', function(req, res) {
    req.body.id = req.param('id');
    company.update(req.body, function(err, company) {
        if (err)
            return res.status(404).send(err);
        return res.send(company);
    });
});

router.delete('/:id', function(req, res) {
    company.remove(req.param('id'), function(err, company) {
        if (err)
            return res.status(404).send(err);
        return res.send(company);
    });
});

var company;
function companysRouter(companyModel) {
    company = companyModel;
    return router;
}

module.exports = companysRouter;


