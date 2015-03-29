'use strict';

var followers = require('../controllers/followers');

var routes = [{
    method: 'GET',
    path: '/followers/',
    handler: followers.me
  }, {
    method: 'GET',
    path: '/followers/{user}',
    handler: followers.list
  }, {
    method: 'GET',
    path: '/followers/following/{user}',
    handler: followers.following
  }
];

module.exports = routes;
