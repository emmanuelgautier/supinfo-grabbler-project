'use strict';

var db = require('../config/db');

exports.show = function(request, reply) {
  db.User.find({ where: { username: req.param('username') }}).then(function(user) {
    res.json(user);
  }).catch(function(err) {
    next(err);
  });
};

exports.me = function(request, reply) {
  res.json(req.user);
};

exports.update = function(request, reply) {

  var user = {
    email: request.payload.email,
    gender: request.payload.gender,
    birthdate: request.payload.gender,
    displayName: request.payload.displayName,
    firstname: request.payload.firstname,
    lastname: request.payload.lastname
  };

  db.User.update(user, { where: { id: request.user.id } }).then(function(user) {
    req.user = user;

    res.json(user);
  }).catch(function(err) {
    next(err);
  });
};

exports.delete = function(request, reply) {

};
