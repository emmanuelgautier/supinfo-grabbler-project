'use strict';

var Boom = require('boom');

var db = require('../config/db');

exports.followers = function(request, reply) {

    db.Follower.findAll();
};

exports.following = function(request, reply) {

    var user = request.auth.credentials;

    reply(user.getFollowing());
};
