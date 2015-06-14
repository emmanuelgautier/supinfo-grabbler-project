'use strict';

var _    = require('lodash'),
    Boom = require('boom');

var db = require('../config/db');

exports.list = function(request, reply) {

  var include = [{
    model: db.User,
    as: 'user',
    include: [
      { model: db.Image, as: 'avatar' },
      { model: db.Image, as: 'cover' }
    ]
  }];

  if(request.query.user) {
    include[0].where = { username: request.query.user };

    delete request.query.user;
  }

  db.Gab.findAll({ 
    where: request.query,
    include: include
  }).then(function(gabs) {
    reply(gabs);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.timeline = function(request, reply) {

  var user = request.auth.credentials;

  var following = [];

  _(user.following).each(function(n) {
    following.push(n.id);
  }).value();

  db.Gab.findAll({
    where: {
      $or: [{
        user_id: user.id
      }, {
        user_id: { in: following }
      }]
    },
    include: {
      model: db.User,
      as: 'user',
      include: [
        { model: db.Image, as: 'avatar' },
        { model: db.Image, as: 'cover' }
      ]
    }
  }).then(function(gabs) {
    reply(gabs);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.count = function(request, reply) {

  db.Gab.count({ where: request.query }).then(function(number) {
    reply(number)
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

  db.Gab.findOne({
    where: { id: request.params.gab },
    include: [
      {
        model: db.User, as: 'user',
        include: [
          { model: db.Image, as: 'avatar' },
          { model: db.Image, as: 'cover' }
        ]
      },
      { model: db.User, as: 'favorite' }
    ]
  }).then(function(gab) {

    if(!gab) {
      return reply(Boom.notFound());
    }

    reply(gab);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.favorite = function(request, reply) {

};

exports.unfavorite = function(request, reply) {

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
