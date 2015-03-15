'use strict';

var express = require('express'),
    router  = express.Router();

var followers = require('../controllers/followers');

router
  .get('/', followers.me)
  .get('/:user_id', followers.list)
  .get('following/:user_id', followers.following);

module.exports = {
  use: '/followers',
  router: router
};
