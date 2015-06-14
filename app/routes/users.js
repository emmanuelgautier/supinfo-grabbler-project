'use strict';

var Joi = require('joi');

var UserValidator = require('../config/validator').User,
    GabValidator = require('../config/validator').Gab;

var users = require('../controllers/users'),
    gabs = require('../controllers/gabs');

var routes = [{
    method: 'GET',
    path: '/users',
    handler: users.list,
    config: {
      validate: {
        query: UserValidator.Schema
      }
    }
  }, {
    method: 'GET',
    path: '/users/{username}',
    handler: users.show,
    config: {
      validate: {
        params: {
          username: Joi.string().alphanum().min(3).max(50)
        }
      }
    }
  }, {
    method: 'GET',
    path: '/me',
    handler: users.me,
    config: {
      auth: 'session'
    }
  }, {
    method: ['PUT', 'POST'],
    path: '/users/{username}',
    handler: users.update,
    config: {
      auth: 'session',
      validate: {
        params: {
          username: Joi.string().alphanum().min(3).max(50)
        },
        payload: UserValidator.User
      }
    }
  }, {
    method: ['PUT', 'POST'],
    path: '/me/avatar',
    handler: users.attachAvatar,
    config: {
      auth: 'session',
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data'
      },
    }
  }, {
    method: 'DELETE',
    path: '/users/{username}',
    handler: users.delete,
    config: {
      auth: 'session',
      validate: {
        params: {
          username:Joi.string().alphanum().min(3).max(50)
        }
      }
    }
  }, {
    method: 'GET',
    path: '/timeline',
    handler: gabs.timeline,
    config: {
      auth: 'session',
      validate: {
        params: {
          query: GabValidator.Schema
        }
      }
    }
  }
];

module.exports = routes;
