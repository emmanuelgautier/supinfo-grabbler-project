'use strict';

var Joi = require('joi');

var UserValidator = require('../config/validator').User,
    GabValidator = require('../config/validator').Gab;

var users = require('../controllers/users'),
    gabs = require('../controllers/gabs');

var routes = [{
    method: 'GET',
    path: '/users/{user}',
    handler: users.show,
    config: {
      validate: {
        params: {
          user: Joi.number().integer().min(1)
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
    method: 'PUT',
    path: '/users/{user}',
    handler: users.update,
    config: {
      auth: 'session',
      validate: {
        params: {
          user: Joi.number().integer().min(1)
        },
        payload: UserValidator.Required
      }
    }
  }, {
    method: 'DELETE',
    path: '/users/{user}',
    handler: users.delete,
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
