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

router.get('/trip/:trip', function(req, res){
   event.findByTrip(req.params.trip, function(err, event){
       if (err)
           return res.status(404).send(err);
       return res.send(event);
   });

});

router.get('/:id', function(req, res) {
    event.findById(req.params.id, function(err, event) {
        if (err)
            return res.status(404).send(err);
        return res.send(event);
    });
});

var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
router.post('/', upload.single('photo'), function(req, res) {
    console.log(req.photo);
    console.log(req.file);
    console.log(req.body);
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


