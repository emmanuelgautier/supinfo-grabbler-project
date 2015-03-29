'use strict';

var actions = require('../controllers/actions');

var routes = [{
    method: 'GET',
    path: '/follow/{user}',
    handler: actions.follow
  }, {
    method: 'GET',
    path: '/unfollow/{user}',
    handler: actions.unfollow
  }
];

module.exports = routes;
