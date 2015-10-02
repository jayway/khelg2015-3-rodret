'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    traveller.find(req.query.filter, function(err, travellers) {
        if (err)
            return res.status(500).send(err);
        return res.send(travellers);
    });
});



router.get('/:id', function(req, res) {
    traveller.findById(req.params.id, function(err, traveller) {
        if (err)
            return res.status(404).send(err);
        return res.send(traveller);
    });
});

router.post('/', function(req, res) {
    traveller.add(req.body, function(err, id) {
        if (err)
            return res.status(500).send(err);
        return res.status(201).json(id);
    });
});

router.put('/:id', function(req, res) {
    req.body.id = req.param('id');
    traveller.update(req.body, function(err, traveller) {
        if (err)
            return res.status(404).send(err);
        return res.send(traveller);
    });
});

router.delete('/:id', function(req, res) {
    traveller.remove(req.param('id'), function(err, traveller) {
        if (err)
            return res.status(404).send(err);
        return res.send(traveller);
    });
});

var traveller;
function travellersRouter(travellerModel) {
    traveller = travellerModel;
    return router;
}

module.exports = travellersRouter;


