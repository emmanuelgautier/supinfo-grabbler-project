'use strict';

var auth = require('../controllers/auth');

var LoginValidator = require('../config/validator').Login,
    RegisterValidator = require('../config/validator').Register;

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
        payload: RegisterValidator.Required
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
