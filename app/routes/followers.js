'use strict';

var Joi = require('joi');

var follow = require('../controllers/follow');

var routes = [{
    method: 'GET',
    path: '/followers',
    handler: follow.followers,
    config: {
      auth: 'session'
    }
  }, {
    method: 'GET',
    path: '/following',
    handler: follow.following,
    config: {
      auth: 'session'
    }
  }, {
    method: 'GET',
    path: '/users/{user}/followers',
    handler: follow.list,
    config: {
      auth: 'session',
      validate: {
        params: {
          user: Joi.number().integer().min(1)
        }
      }
    }
  }
];

module.exports = routes;
