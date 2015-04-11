'use strict';

var db = require('../config/db');

exports.show = function(request, reply) {
  db.User.find({ where: { username: req.param('username') }}).then(function(user) {
    res.json(user);
  }).catch(function(err) {
    next(err);
  });
};

exports.me = function(request, reply) {
  res.json(req.user);
};

exports.update = function(request, reply) {
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

exports.delete = function(request, reply) {

};
