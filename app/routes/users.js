'use strict';

var Joi = require('joi');

var UserValidator = require('../config/validator').User,
    UserRequiredValidator = require('../config/validator').UserRequired,
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
        payload: UserRequiredValidator
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
    path: '/users/{user}/gabs',
    handler: gabs.list,
    config: {
      validate: {
        params: {
          user: Joi.number().integer().min(1)
        },
        query: GabValidator
      }
    }
  }
];

module.exports = routes;
