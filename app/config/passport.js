'use strict';

var passport       = require('passport'),
    LocalStrategy  = require('passport-local').Strategy,

    db = require(__dirname + '/../config/db'),

    auth           = require('../controllers/auth');

module.exports = function(app, config) {
  passport.use(new LocalStrategy(auth.authenticate.local));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    db.User.find(id).success(function(user) {
      done(null, user);
    }).error(function(err) {
      done(err);
    });
  });

  app.use(passport.initialize());
  app.use(passport.session());
};
