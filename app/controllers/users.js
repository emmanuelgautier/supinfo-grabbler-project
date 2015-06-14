'use strict';

var Boom = require('boom');

var db = require('../config/db');

exports.list = function(request, reply) {

  var where = request.query;

  if(where.username) {
    where.username = { like: '%' + where.username + '%' };
  }

  db.User.findAll({ 
    where: where,
    include: [
      { model: db.Image, as: 'avatar' },
      { model: db.Image, as: 'cover' }
    ]
  }).then(function(users) {
    reply(users);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.show = function(request, reply) {

  db.User.find({ 
    where: { username: request.params.username },
    include: [
      { model: db.Image, as: 'avatar' },
      { model: db.Image, as: 'cover' },
      { model: db.User, as: 'followers' },
      { model: db.User, as: 'following' }
    ]
  }).then(function(user) {
    if(!user) {
      return reply(Boom.notFound());
    }

    //if is connected, detect if he is following user
    request.server.auth.test('session', request, function(err, credentials) {
      if(!err) {
        user.isFollowing(credentials.following);
      }

      reply(user);
    });
  }).catch(function(err) {
    throw err;
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
