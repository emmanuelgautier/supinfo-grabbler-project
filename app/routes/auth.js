'use strict';

var express  = require('express'),
    router   = express.Router(),

    passport = require('passport'),

    auth     = require('../controllers/auth');

router
  .post('/register', auth.register)
  .post('/login', passport.authenticate('local'))
  .get('/logout', auth.logout);

module.exports = {
  use: '/',
  router: router
};
