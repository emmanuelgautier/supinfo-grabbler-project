'use strict';

var Joi = require('joi');

var actions = require('../controllers/actions');

var routes = [{
    method: 'GET',
    path: '/follow/{user}',
    handler: actions.follow,
    config: {
      auth: 'session',
      validate: {
        params: {
          user: Joi.number().integer().min(1)
        }
      }
    }
  }, {
    method: 'GET',
    path: '/unfollow/{user}',
    handler: actions.unfollow,
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
