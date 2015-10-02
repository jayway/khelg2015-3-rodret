'use strict';
var debug = require('debug')('express-lab:event-proposal');


function Event(db, seed) {
    this.db = db;
    this.events = db.collection('events');
    this.seed = seed;
}

Event.prototype.find = function(filter, callback) {
    var query = {
        $or:[
            {name: { $regex: filter, $options: 'i'}},
            {company: { $regex: filter, $options: 'i'}}
        ]
    };
    if (!filter) query = {};
    this.events.find(query).toArray(function(err, events) {
        callback(err, events);
    });
};

Event.prototype.findById = function(id, callback) {
    console.log(id);
    this.events.findById(id, function(err, event) {
        return callback(err, event);
    });
};


Event.prototype.add = function(event, callback) {
    this.events.insert(event, function(err, addedevent) {
        debug(addedevent);
        callback(err, addedevent._id);
    });
};

Event.prototype.update = function(event, callback) {
    var events = this.events;
    var id = event._id;
    this.findById(id, function(err, found) {
        if (!found)
            return callback('event not found, id: ' + id);
        events.update({_id: event._id}, event, function(err) {
            return callback(err, event);
        });
    });
};

Event.prototype.remove = function(eventOrId, callback) {
    var events = this.events;
    var id = eventOrId._id || eventOrId;
    this.findById(id, function(err, event) {
        if (!event)
            return callback('event not found, id: ' + id);
        events.remove({_id: id}, function(err) {
            return callback(err, event);
        });
    });
};


Event.prototype.reset = function(callback) {
    var events = this.events;
    var seed = this.seed;
    events.drop(function(err, data) {
        events.insert(seed, function(err, data) {
            callback(err);
        });
    });
};

module.exports = Event;

