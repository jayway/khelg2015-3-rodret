'use strict';
var debug = require('debug')('express-lab:event-proposal');
var EventEmitter = require('events').EventEmitter;
var util = require('util');



function Event(db, seed) {
    this.db = db;
    this.events = db.collection('events');
    this.seed = seed;
    EventEmitter.call(this);
}
util.inherits(Event, EventEmitter);

Event.prototype.find = function(filter, callback) {
    var query = {
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
        self.emit('added', addedevent);
    });

};

Event.prototype.update = function(event, callback) {
    var events = this.events;
    var id = event._id;
    this.findById(id, function(err, found) {
        if (!found)
            return callback('event not found, id: ' + id);
        events.update({_id: event._id}, event, function(err) {
            self.emit('updated', addedevent);
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
            self.emit('removed', event);
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

