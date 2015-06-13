'use strict';

var Boom = require('boom');

var db = require('../config/db');

exports.list = function(request, reply) {

  db.User.findAll().then(function(users) {
    reply(users);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.followers = function(request, reply) {


};

exports.following = function(request, reply) {


};

exports.followingUser = function(request, reply) {


};
