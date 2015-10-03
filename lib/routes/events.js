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
var s3 = require('multer-s3');

var upload = multer({
  storage: s3({
    bucket: 'travelway-photos',
    dirname: 'photos',
    secretAccessKey: 'b2gNm42Qfm57AkOkpupyuurFTsvEkh/SXaWKVPRI',
    accessKeyId: 'AKIAJNSFPBQNGANU4XLQ',
    region: 'eu-west-1',
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  })
})

var server = 'https://s3-eu-west-1.amazonaws.com/travelway-photos/';
router.post('/', upload.single('photo'), function(req, res) {
    console.log(req.body);
    console.log(req.file);
    var url = req.file.key ? server + req.file.key : null;
    var data = {
      title: req.body.title,
      text: req.body.text,
      timestamp: req.body.timestamp,
      photo: url
    };
    event.add(data, function(err, id) {
        if (err)
            return res.status(500).send(err);
        data.id = id;
        return res.status(201).json(data);
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


