'use strict';

var Joi = require('joi');

var GabValidator = require('../config/validator').Gab,
    GabRequiredValidator = require('../config/validator').GabRequired;

var gabs = require('../controllers/gabs');

var routes = [{
    method: 'GET',
    path: '/gabs/count',
    handler: gabs.count,
    config: {
      auth: 'session'
    }
  }, {
    method: 'POST',
    path: '/gabs/',
    handler: gabs.create,
    config: {
      auth: 'session',
      validate: {
        payload: GabRequiredValidator
      }
    }
  }, {
    method: 'GET',
    path: '/gabs/{gab}',
    handler: gabs.show,
    config: {
      validate: {
        params: {
          gab: Joi.number().integer().min(1)
        }
      }
    }
  }, {
    method: 'DELETE',
    path: '/gabs/{gab}',
    handler: gabs.delete,
    config: {
      auth: 'session',
      validate: {
        params: {
          gab: Joi.number().integer().min(1)
        }
      }
    }
  }
];

module.exports = routes;
