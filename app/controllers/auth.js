'use strict';

var db = require('../config/db');

exports.authenticate = {
  local: function(username, password, done) {
    db.User.find({ where: { username: username }}).then(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        done(null, user);
      });
    }).catch(function(err) {
      return done(err);
    });
  },
};

exports.register = function(req, res, next) {
  db.User.create({
    username: req.param('username'),
    password: req.param('password'),
    email: req.param('email')
  }).then(function(user) {
    res.json(user);
  }).catch(function(err) {
    next(err);
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
