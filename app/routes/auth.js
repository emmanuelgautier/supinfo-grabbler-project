'use strict';

var auth = require('../controllers/auth');

var routes = [{
    method: 'POST',
    path: '/login',
    handler: auth.login
  }, {
    method: 'POST',
    path: '/register',
    handler: auth.register
  }, {
    method: 'GET',
    path: '/logout',
    config: {
      handler: auth.logout,
      auth: 'session'
    }
  }
];

module.exports = routes;
