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

  var inputs = {
    username: request.payload.username,
    password: request.payload.password
  };

  var validator = Joi.validate(inputs, LoginSchema);

  if(validator.error !== null) {
    return reply(Boom.badRequest(validator.error));
  }

  db.User.find({ where: { username: inputs.username } }).then(function(user) {

    if(!user || !user.checkPassword(inputs.password)) {
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

  var inputs = {
    username: request.payload.username,
    email: request.payload.email,
    birthdate: (new Date(request.payload.birthdate)),
    firstname: request.payload.firstname,
    lastname: request.payload.lastname,
    password: request.payload.password
  };

  var validator = Joi.validate(inputs, RegisterSchema);

  if(validator.error !== null) {
    return reply(Boom.badRequest(validator.error));
  }

  db.User.create(inputs).then(function(user) {

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
