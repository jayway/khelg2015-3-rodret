'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    event.find(req.query.filter, function(err, events) {
        if (err)
            return res.status(500).send(err);
        return res.send(events);
    });
});

router.get('/:id', function(req, res) {
    console.log(req.params)
    event.findById(req.params.id, function(err, event) {
        if (err)
            return res.status(404).send(err);
        return res.send(event);
    });
});

router.post('/', function(req, res) {
    event.add(req.body, function(err, id) {
        if (err)
            return res.status(500).send(err);
        return res.status(201).json(id);
    });
});

router.put('/:id', function(req, res) {
    req.body.id = req.param('id');
    event.update(req.body, function(err, event) {
        if (err)
            return res.status(404).send(err);
        return res.send(event);
    });
});

router.delete('/:id', function(req, res) {
    event.remove(req.param('id'), function(err, event) {
        if (err)
            return res.status(404).send(err);
        return res.send(event);
    });
});

var event;
function eventsRouter(eventModel) {
    event = eventModel;
    return router;
}

module.exports = eventsRouter;


