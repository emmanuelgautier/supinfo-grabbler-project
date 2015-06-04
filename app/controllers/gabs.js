'use strict';

var Boom = require('Boom'),
    Joi = require('joi');

var db = require('../config/db');

exports.list = function(request, reply) {

  db.Gab.findAll({ where: request.query }).then(function(gabs) {
    reply(gabs);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.timeline = function(request, reply) {

  request.query = request.query || {};

  return exports.list(request, reply);
};

exports.count = function(request, reply) {

  db.Gab.count({ where: request.query }).then(function(number) {
    reply({ number: number })
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.create = function(request, reply) {

  var user = request.auth.credentials;

  var gab = {
    gab: request.payload.gab,
    user_id: user.id
  };

  db.Gab.create(gab).then(function(gab) {
    reply(gab).code(201);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.show = function(request, reply) {

  db.Gab.findOne(request.params.gab).then(function(gab) {
    if(!gab) {
      return reply(Boom.notFound());
    }

    reply(gab);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.delete = function(request, reply) {

  var user = request.auth.credentials;

  db.Gab.destroy({ where: { id: request.params.gab, user_id: user.id } }).then(function(gab) {
    if(!gab) {
      return reply(Boom.notFound());
    }

    reply().code(204);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};
