'use strict';

var auth = require('../controllers/auth');

var LoginRequiredValidator = require('../config/validator').LoginRequired,
    UserRequiredValidator = require('../config/validator').UserRequired;

var routes = [{
    method: 'POST',
    path: '/login',
    handler: auth.login,
    config: {
      validate: {
        payload: LoginRequiredValidator
      }
    }
  }, {
    method: 'POST',
    path: '/register',
    handler: auth.register,
    config: {
      validate: {
        payload: UserRequiredValidator
      }
    }
  }, {
    method: 'GET',
    path: '/logout',
    handler: auth.logout,
    config: {
      auth: 'session'
    }
  }
];

module.exports = routes;
