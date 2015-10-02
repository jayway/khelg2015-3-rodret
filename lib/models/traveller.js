'use strict';
var debug = require('debug')('express-lab:traveller');


function Traveller(db, seed) {
    this.db = db;
    this.travellers = db.collection('travellers');
    this.seed = seed;
}


Traveller.prototype.findByName = function(name, callback){
    var query = {name:name};
    this.travellers.find(query).toArray(function(err, travellers) {
        callback(err, travellers);
    });
}

Traveller.prototype.findByCompany = function(company, callback){
    var query = {company:company};
    this.travellers.find(query).toArray(function(err, travellers) {
        callback(err, travellers);
    });
}

Traveller.prototype.find = function(filter, callback) {
    var query = {
        $or:[
            {name: { $regex: filter, $options: 'i'}},
            {company: { $regex: filter, $options: 'i'}}
        ]
    };
    if (!filter) query = {};
    this.travellers.find(query).toArray(function(err, travellers) {
        callback(err, travellers);
    });
};

Traveller.prototype.findById = function(id, callback) {
    console.log(id);
    this.travellers.findById(id, function(err, traveller) {
        return callback(err, traveller);
    });
};


Traveller.prototype.add = function(traveller, callback) {
    this.travellers.insert(traveller, function(err, addedtraveller) {
        debug(addedtraveller);
        callback(err, addedtraveller._id);
    });
};

Traveller.prototype.update = function(traveller, callback) {
    var travellers = this.travellers;
    var id = traveller._id;
    this.findById(id, function(err, found) {
        if (!found)
            return callback('traveller not found, id: ' + id);
        travellers.update({_id: traveller._id}, traveller, function(err) {
            return callback(err, traveller);
        });
    });
};

Traveller.prototype.remove = function(travellerOrId, callback) {
    var travellers = this.travellers;
    var id = travellerOrId._id || travellerOrId;
    this.findById(id, function(err, traveller) {
        if (!traveller)
            return callback('traveller not found, id: ' + id);
        travellers.remove({_id: id}, function(err) {
            return callback(err, traveller);
        });
    });
};


Traveller.prototype.reset = function(callback) {
    var travellers = this.travellers;
    var seed = this.seed;
    travellers.drop(function(err, data) {
        travellers.insert(seed, function(err, data) {
            callback(err);
        });
    });
};

module.exports = Traveller;

