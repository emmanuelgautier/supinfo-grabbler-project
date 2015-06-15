'use strict';

var Boom = require('boom');

var db = require('../config/db');

exports.followers = function(request, reply) {

  db.User.find({
    where: {
      username: request.params.username
    },
    include: [{ model: db.User, as: 'followers' }]
  }).then(function(user) {
    if(!user) {
      return reply(Boom.notFound());
    }

    reply(user.followers);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.following = function(request, reply) {

  db.User.find({
    where: {
      username: request.params.username
    },
    include: [{ model: db.User, as: 'following' }]
  }).then(function(user) {
    if(!user) {
      return reply(Boom.notFound());
    }

    reply(user.following);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};
