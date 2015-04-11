'use strict';

var users = require('../controllers/users'),
    gabs = require('../controllers/gabs');

var routes = [{
    method: 'GET',
    path: '/users/{user}',
    handler: users.show
  }, {
    method: 'GET',
    path: '/me',
    config: {
      handler: users.me,
      auth: 'session'
    }
  }, {
    method: 'PUT',
    path: '/users/{user}',
    config: {
      handler: users.update,
      auth: 'session'
    }
  }, {
    method: 'DELETE',
    path: '/users/{user}',
    config: {
      handler: users.delete,
      auth: 'session'
    }
  }, {
    method: 'GET',
    path: '/users/{user}/gabs',
    handler: gabs.list
  }
];

module.exports = routes;
