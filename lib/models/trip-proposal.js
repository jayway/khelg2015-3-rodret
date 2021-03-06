'use strict';
var debug = require('debug')('express-lab:trip-proposal');


function TripProposal(db, seed) {
    this.db = db;
    this.trips = db.collection('trips');
    this.seed = seed;
}


TripProposal.prototype.findByName = function(name, callback){
    var query = {name:name};
    this.trips.find(query).toArray(function(err, trips) {
        callback(err, trips);
    });
}

TripProposal.prototype.findByCompany = function(company, callback){
    var query = {company:company};
    this.trips.find(query).toArray(function(err, trips) {
        callback(err, trips);
    });
}

TripProposal.prototype.find = function(filter, callback) {
    var query = {
        $or:[
            {name: { $regex: filter, $options: 'i'}},
            {company: { $regex: filter, $options: 'i'}}
        ]
    };
    if (!filter) query = {};
    this.trips.find(query).toArray(function(err, trips) {
        callback(err, trips);
    });
};

TripProposal.prototype.findById = function(id, callback) {
    console.log(id);
    this.trips.findById(id, function(err, trip) {
        return callback(err, trip);
    });
};


TripProposal.prototype.add = function(trip, callback) {
    if(!trip.hasOwnProperty("name")){
        trip.name ="";
    }
    if(!trip.hasOwnProperty("members")){
        trip.members=[];
    }
    if(!trip.hasOwnProperty("company")){
        trip.company="";
    }
    this.trips.insert(trip, function(err, addedtrip) {
        debug(addedtrip);
        callback(err, addedtrip._id);
    });
};

TripProposal.prototype.update = function(trip, callback) {
    var trips = this.trips;
    var id = trip._id;
    this.findById(id, function(err, found) {
        if (!found)
            return callback('trip not found, id: ' + id);
        trips.update({_id: trip._id}, trip, function(err) {
            return callback(err, trip);
        });
    });
};

TripProposal.prototype.remove = function(tripOrId, callback) {
    var trips = this.trips;
    var id = tripOrId._id || tripOrId;
    this.findById(id, function(err, trip) {
        if (!trip)
            return callback('trip not found, id: ' + id);
        trips.remove({_id: id}, function(err) {
            return callback(err, trip);
        });
    });
};


TripProposal.prototype.reset = function(callback) {
    var trips = this.trips;
    var seed = this.seed;
    trips.drop(function(err, data) {
        trips.insert(seed, function(err, data) {
            callback(err);
        });
    });
};

module.exports = TripProposal;

