'use strict';

var db = require('../config/db');

exports.show = function(request, reply) {

  db.User.find({ where: { username: req.params.username }}).then(function(user) {
    reply(user);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.me = function(request, reply) {

  reply(request.auth.credentials);
};

exports.update = function(request, reply) {

  var user = request.auth.credentials;

  user.update({
    email: request.payload.email,
    gender: request.payload.gender,
    birthdate: request.payload.gender,
    displayName: request.payload.displayName,
    firstname: request.payload.firstname,
    lastname: request.payload.lastname 
  }).then(function(user) {
    request.auth.credentials = user;

    reply(user);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.delete = function(request, reply) {

};
