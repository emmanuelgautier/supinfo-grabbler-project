'use strict';

var db = require('../config/db');

exports.list = function(req, res, next) {
  db.User.findAll().then(function(users) {
    res.json(users);
  }).catch(function(err) {
    next(err);
  });
};

exports.show = function(req, res, next) {
  db.User.find({ where: { username: req.param('username') }}).then(function(user) {
    res.json(user);
  }).catch(function(err) {
    next(err);
  });
};

exports.me = function(req, res) {
  res.json(req.user);
};

exports.update = function(req, res, next) {
  if(!req.user) {
    res.json({ 'unauthenticated': 'Your are not authenticated !' });

    return;
  }

  db.User.update({
    email: req.param('email'),
    gender: req.param('gender'),
    birthdate: req.param('gender'),
    displayName: req.param('displayName'),
    firstname: req.param('firstname'),
    lastname: req.param('lastname')
  }, req.user.id).then(function(user) {
    req.user = user;

    res.json(user);
  }).catch(function(err) {
    next(err);
  });
};
