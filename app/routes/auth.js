'use strict';

var auth = require('../controllers/auth');

var LoginValidator = require('../config/validator').Login,
    UserValidator = require('../config/validator').User;

var routes = [{
    method: 'POST',
    path: '/login',
    handler: auth.login,
    config: {
      validate: {
        payload: LoginValidator.Required
      }
    }
  }, {
    method: 'POST',
    path: '/register',
    handler: auth.register,
    config: {
      validate: {
        payload: UserValidator.Required
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
