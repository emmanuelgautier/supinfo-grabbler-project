'use strict';

var actions = require('../controllers/actions');

var routes = [{
    method: 'GET',
    path: '/follow/{user}',
  }, {
    method: 'GET',
    path: '/unfollow/{user}',
  }
];

module.exports = routes;
