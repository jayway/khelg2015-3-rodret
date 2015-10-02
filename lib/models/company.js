'use strict';
var debug = require('debug')('express-lab:company');


function Company(db, seed) {
    this.db = db;
    this.companies = db.collection('companies');
    this.seed = seed;
}


Company.prototype.findByName = function(name, callback){
    var query = {name:name};
    this.companies.find(query).toArray(function(err, companies) {
        callback(err, companies);
    });
}


Company.prototype.find = function(filter, callback) {
    var query = {
        $or:[
            {name: { $regex: filter, $options: 'i'}},
            {company: { $regex: filter, $options: 'i'}}
        ]
    };
    if (!filter) query = {};
    this.companies.find(query).toArray(function(err, companies) {
        callback(err, companies);
    });
};

Company.prototype.findById = function(id, callback) {
    console.log(id);
    this.companies.findById(id, function(err, company) {
        return callback(err, company);
    });
};


Company.prototype.add = function(company, callback) {
    this.companies.insert(company, function(err, addedcompany) {
        debug(addedcompany);
        callback(err, addedcompany._id);
    });
};

Company.prototype.update = function(company, callback) {
    var companies = this.companies;
    var id = company._id;
    this.findById(id, function(err, found) {
        if (!found)
            return callback('company not found, id: ' + id);
        companies.update({_id: company._id}, company, function(err) {
            return callback(err, company);
        });
    });
};

Company.prototype.remove = function(companyOrId, callback) {
    var companies = this.companies;
    var id = companyOrId._id || companyOrId;
    this.findById(id, function(err, company) {
        if (!company)
            return callback('company not found, id: ' + id);
        companies.remove({_id: id}, function(err) {
            return callback(err, company);
        });
    });
};


Company.prototype.reset = function(callback) {
    var companies = this.companies;
    var seed = this.seed;
    companies.drop(function(err, data) {
        companies.insert(seed, function(err, data) {
            callback(err);
        });
    });
};

module.exports = Company;

