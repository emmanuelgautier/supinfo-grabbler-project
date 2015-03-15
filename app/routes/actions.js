'use strict';

var express = require('express'),
    router  = express.Router();

var actions = require('../controllers/actions');

router
  .get('follow/:user_id', followers.follow)
  .get('unfollow/:user_id', followers.unfollow);

module.exports = {
  use: '/',
  router: router
};
