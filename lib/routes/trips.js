'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    trip.find(req.query.filter, function(err, trips) {
        if (err)
            return res.status(500).send(err);
        return res.send(trips);
    });
});

router.get('/company/:company', function(req, res){
    trip.findByCompany(req.params.company, function(err, trips){
        if (err)
            return res.status(404).send(err);
        return res.send(trips);
    });
});

router.get('/name/:name', function(req, res){
    trip.findByName(req.params.name, function(err, trips){
        if (err)
            return res.status(404).send(err);
        return res.send(trips);
    });
});


router.get('/:id', function(req, res) {
    trip.findById(req.params.id, function(err, trip) {
        if (err)
            return res.status(404).send(err);
        return res.send(trip);
    });
});

router.post('/', function(req, res) {
    trip.add(req.body, function(err, id) {
        if (err)
            return res.status(500).send(err);
        return res.status(201).json(id);
    });
});

router.put('/:id', function(req, res) {
    req.body.id = req.param('id');
    trip.update(req.body, function(err, trip) {
        if (err)
            return res.status(404).send(err);
        return res.send(trip);
    });
});

router.delete('/:id', function(req, res) {
    trip.remove(req.param('id'), function(err, trip) {
        if (err)
            return res.status(404).send(err);
        return res.send(trip);
    });
});

var trip;
function tripsRouter(tripModel) {
    trip = tripModel;
    return router;
}

module.exports = tripsRouter;


