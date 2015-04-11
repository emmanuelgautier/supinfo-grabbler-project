'use strict';

var actions = require('../controllers/actions');

var routes = [{
    method: 'GET',
    path: '/follow/{user}',
    config: {
      handler: actions.follow,
      auth: 'session'
    }
  }, {
    method: 'GET',
    path: '/unfollow/{user}',
    config: {
      handler: actions.unfollow,
      auth: 'session'
    }
  }
];

module.exports = routes;
