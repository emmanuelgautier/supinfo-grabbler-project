'use strict';

var express = require('express'),
    router  = express.Router();

var users   = require('../controllers/users');

router
  .get('/', users.list)
  .get('/me', users.me)
  .get('/:id', users.show)
  .put('/update/:id', users.update)
  .del('/delete/:id', users.delete);

module.exports = {
  use: '/users',
  router: router
};
