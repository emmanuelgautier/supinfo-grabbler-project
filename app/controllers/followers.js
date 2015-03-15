'use strict';

var db = require('../config/db');

exports.list = function(req, res, next) {
  db.User.findAll().then(function(users) {
    res.json(users);
  }).catch(function(err) {
    next(err);
  });
};

exports.following = function() {

};
