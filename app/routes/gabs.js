'use strict';

var Joi = require('joi');

var GabValidator = require('../config/validator').Gab;

var gabs = require('../controllers/gabs');

var routes = [{
    method: 'GET',
    path: '/gabs',
    handler: gabs.list,
    config: {
      validate: {
        query: GabValidator.Schema
      }
    }
  }, {
    method: 'GET',
    path: '/gabs/count',
    handler: gabs.count,
    config: {
      validate: {
        query: GabValidator.Schema
      }
    }
  }, {
    method: 'POST',
    path: '/gabs',
    handler: gabs.create,
    config: {
      auth: 'session',
      validate: {
        payload: GabValidator.Required
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
