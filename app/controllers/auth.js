'use strict';

var db = require('../config/db');

exports.authenticate = {
  local: function(username, password, done) {
    db.User.find({ where: { username: username }}).success(function(user) {
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        done(null, user);
      });
    }).err(function(err) {
      return done(err);
    });
  },
};

exports.register = function(req, res) {
  var user = new User();
    user.username    = req.param('username');
    user.displayName = user.username;
    user.emails      = [{ value: req.param('email'), type: 'Primary' }];
    user.password    = req.param('password');

  user.save(function(err) {
    if(err) {
      req.flash('error', 'An unknown error occured !');

      res.render('auth/register', {
        noangular: true,
        error: req.flash('error')
      });
    }

    res.redirect('/login');
  });
};

exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};
