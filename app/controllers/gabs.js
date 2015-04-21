'use strict';

var Boom = require('Boom'),
    Joi = require('joi');

var db = require('../config/db');

var GabSchema = require('../validators/GabSchema');

exports.list = function(request, reply) {

};

exports.create = function(request, reply) {
  var inputs = {
    gab: request.payload.gab,
  };

  var validator = Joi.validate(inputs, GabSchema);

  if(validator.error !== null) {
    return reply(Boom.badRequest(validator.error));
  }

  var gab = inputs;
  	gab.user_id = request.auth.credentials.id;

  db.Gab.create(gab).then(function(gab) {
  	reply(gab);
  }).catch(function(err) {
  	reply(Boom.badImplementation());
  });
};

exports.show = function(request, reply) {

};

exports.delete = function(request, reply) {

};

exports.count = function(request, reply) {

};
