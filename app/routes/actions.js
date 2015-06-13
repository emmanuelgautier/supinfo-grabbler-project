'use strict';

var Joi = require('joi');

var actions = require('../controllers/actions');

var routes = [{
    method: 'GET',
    path: '/follow/{username}',
    handler: actions.follow,
    config: {
      auth: 'session',
      validate: {
        params: {
          username: Joi.string()
        }
      }
    }
  }, {
    method: 'GET',
    path: '/unfollow/{username}',
    handler: actions.unfollow,
    config: {
      auth: 'session',
      validate: {
        params: {
          username: Joi.string()
        }
      }
    }
  }
];

module.exports = routes;
