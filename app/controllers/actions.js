'use strict';

var Boom = require('boom');

var db = require('../config/db');

exports.follow = function(request, reply) {

  //find user to follow
  db.User.find({
    where: { username: request.params.username }
  }).then(function(user) {

    if(!user) {
      return reply(Boom.notFound());
    }

    //create relation between two users
    db.Follower.create({
      user_id: user.id,
      follower_id: request.auth.credentials.id
    }).then(function(followers) {
      reply().code(204);
    }).catch(function(err) {
      reply(Boom.badImplementation());
    });
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.unfollow = function(request, reply) {

  //find user to unfollow
  db.User.find({
    where: { username: request.params.username }
  }).then(function(user) {

    if(!user) {
      return reply(Boom.notFound());
    }

    //create relation between two users
    db.Follower.destroy({
      where: {
        user_id: user.id,
        follower_id: request.auth.credentials.id
      }
    }).then(function(followers) {
      reply().code(204);
    }).catch(function(err) {
      reply(Boom.badImplementation());
    });
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};
