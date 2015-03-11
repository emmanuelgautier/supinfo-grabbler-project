'use strict';

var express = require('express'),
    router  = express.Router();

var followers = require('../controllers/followers');

router
  .get('/', followers.list)
  .get('follow/:user_id', followers.follow)
  .get('unfollow/:user_id', followers.unfollow)
  .get('following/:user_id', followers.following);

module.exports = {
  use: '/followers',
  router: router
};
