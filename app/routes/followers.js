'use strict';

var follow = require('../controllers/follow');

var routes = [{
    method: 'GET',
    path: '/followers',
    config: {
      handler: follow.followers,
      auth: 'session'
    }
  }, {
    method: 'GET',
    path: '/following',
    config: {
      handler: follow.following,
      auth: 'session'
    }
  }, {
    method: 'GET',
    path: '/users/{user}/followers',
    config: {
      handler: follow.list,
      auth: 'session'
    }
  }
];

module.exports = routes;
