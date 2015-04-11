'use strict';

var Boom = require('Boom'),
    Joi = require('joi');

var db = require('../config/db');

var RegisterSchema = require('../validators/RegisterSchema'),
    LoginSchema = require('../validators/LoginSchema');

exports.login = function(request, reply) {

  if (request.auth.isAuthenticated) {
    return reply(Boom.create(200));
  }

  db.User.find({ where: { username: request.payload.username } }).then(function(user) {

    console.log(user);

    if(!user || !user.checkPassword(request.payload.password)) {
      return reply(Boom.unauthorized('invalid credentials'));
    }

    request.auth.session.set(user);

    reply(user);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.register = function(request, reply) {

  if (request.auth.isAuthenticated) {
    return reply(Boom.create(200));
  }

  var validator = Joi.validate({
    username: request.payload.username,
    password: request.payload.password
  }, RegisterSchema);

  if(validator.error !== null) {
    return reply(Boom.badRequest(validator.error));
  }

  db.User.create({
    username: request.payload.username,
    password: request.payload.password
  }).then(function(user) {

    request.auth.session.set(user);

    reply(user);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.logout = function(request, reply) {

    request.auth.session.clear();

    return reply.redirect('/');
};
