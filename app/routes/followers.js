'use strict';

var Joi = require('joi');

var follow = require('../controllers/follow');

var routes = [{
    method: 'GET',
    path: '/users/{username}/following',
    handler: follow.followingUser,
    config: {
      validate: {
        params: {
          username: Joi.string()
        }
      }
    }
  }, {
    method: 'GET',
    path: '/users/{username}/followers',
    handler: follow.list,
    config: {
      validate: {
        params: {
          username: Joi.string()
        }
      }
    }
  }
];

module.exports = routes;
