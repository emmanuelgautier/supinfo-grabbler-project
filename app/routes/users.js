'use strict';

var users   = require('../controllers/users');

var routes = [{
    method: 'GET',
    path: '/users/',
    handler: users.list
  }, {
    method: 'GET',
    path: '/users/{user}',
    handler: users.show
  }, {
    method: 'GET',
    path: '/me',
    handler: users.me
  }, {
    method: 'PUT',
    path: '/users/{user}',
    handler: users.update
  }, {
    method: 'DELETE',
    path: '/users/{user}',
    handler: users.delete
  }
];

module.exports = routes;
