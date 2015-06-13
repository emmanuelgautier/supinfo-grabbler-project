'use strict';

var Boom = require('boom');

var db = require('../config/db');

exports.show = function(request, reply) {

  db.User.find({ where: { username: request.params.username }}).then(function(user) {
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
    user.email       = request.payload.email || user.email;
    user.gender      = request.payload.gender || user.gender;
    user.birthdate   = request.payload.birthdate || user.birthdate;
    user.displayName = request.payload.displayName || user.displayName;
    user.firstname   = request.payload.firstname || user.firstname;
    user.lastname    = request.payload.lastname || user.lastname;

  if(user.username != request.params.username) {
    return reply(Boom.unauthorized());
  }

  db.User.update(user, {
    where: { id: user.id }
  }).then(function() {
    reply(user);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.attachCover = function(request, reply) {

};

exports.attachAvatar = function(request, reply) {

};

exports.delete = function(request, reply) {

  var user = request.auth.credentials;

  if(user.username != request.params.username) {
    return reply(Boom.unauthorized());
  }

  user.destroy();

  reply(user);
};
