'use strict';

var Boom = require('Boom'),
    Joi = require('joi');

var db = require('../config/db');

exports.list = function(request, reply) {

};

exports.create = function(request, reply) {

  var gab = {
    gab: request.payload.gab,
    user_id: request.auth.credentials.id
  };

  db.Gab.create(gab).then(function(gab) {
    reply(gab, 201);
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
