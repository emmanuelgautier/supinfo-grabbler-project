'use strict';

var db = require('../config/db');

exports.list = function(request, reply) {
  db.User.findAll().then(function(users) {
    res.json(users);
  }).catch(function(err) {
    next(err);
  });
};

exports.followers = function(request, reply) {

};

exports.following = function(request, reply) {

};
