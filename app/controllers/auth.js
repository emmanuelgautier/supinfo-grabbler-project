'use strict';

var Boom = require('Boom');

var db = require('../config/db');

exports.login = function(request, reply) {

  if (request.auth.isAuthenticated) {
    return reply(Boom.create(200));
  }

  var inputs = {
    username: request.payload.username,
    password: request.payload.password
  };

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

  var user = {
    username: request.payload.username,
    email: request.payload.email,
    gender: req.payload.gender,
    birthdate: (new Date(request.payload.birthdate)),
    firstname: request.payload.firstname,
    lastname: request.payload.lastname,
    password: request.payload.password
  };

  db.User.findOne(user.username, function(user) {
    if(user) {
      return reply(Boom.badRequest('Username already used'));
    }

    db.User.create(user).then(function(user) {
      request.auth.session.set(user);

      reply(user);
    }).catch(function(err) {
      reply(Boom.badImplementation());
    });
  });
};

exports.logout = function(request, reply) {

    request.auth.session.clear();

    return reply.redirect('/');
};
