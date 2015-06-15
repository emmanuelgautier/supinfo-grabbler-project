'use strict';

var fs = require('fs'),
    crypto = require('crypto'),
    Boom = require('boom');

var db = require('../config/db');

var moveFileToUploadDirectory = function(file, filename, callback) {

  var path = __dirname + "/../../public/uploads/" + filename;

  var fileStream = fs.createWriteStream(path);

  fileStream.on('error', function (err) { 
    callback(err);
  });

  file.pipe(fileStream);
  file.on('end', function () {
    callback(null)
  });
};

var generateToken = function() {
  return crypto.createHash('md5')
                .update( Date.now() + Math.random().toString() )
                .digest('hex');
};

exports.list = function(request, reply) {

  var where = request.query;

  if(where.username) {
    where.username = { like: '%' + where.username + '%' };
  }

  db.User.findAll({ 
    where: where,
    include: [
      { model: db.Image, as: 'avatar' },
      { model: db.Image, as: 'cover' }
    ]
  }).then(function(users) {
    reply(users);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.show = function(request, reply) {

  db.User.find({ 
    where: { username: request.params.username },
    include: [
      { model: db.Image, as: 'avatar' },
      { model: db.Image, as: 'cover' },
      { model: db.User, as: 'followers' },
      { model: db.User, as: 'following' }
    ]
  }).then(function(user) {
    if(!user) {
      return reply(Boom.notFound());
    }

    //if is connected, detect if he is following user
    request.server.auth.test('session', request, function(err, credentials) {
      if(!err) {
        user.isFollowing(credentials.following);
      }

      reply(user);
    });
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.me = function(request, reply) {

  var user = request.auth.credentials;

  db.User.find({ 
    where: { username: user.username },
    include: [
      { model: db.Image, as: 'avatar' },
      { model: db.Image, as: 'cover' },
      { model: db.User, as: 'followers' },
      { model: db.User, as: 'following' }
    ]
  }).then(function(user) {
    if(!user) {
      return reply(Boom.notFound());
    }

    request.auth.session.set(user);

    reply(user);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.update = function(request, reply) {

  var user = request.auth.credentials;
    user.email       = request.payload.email || user.email;
    user.gender      = request.payload.gender || user.gender;
    user.birthdate   = request.payload.birthdate || user.birthdate;
    user.displayName = request.payload.displayName || user.displayName;
    user.firstname   = request.payload.firstname || user.firstname;
    user.lastname    = request.payload.lastname || user.lastname;

  if(user.username != request.params.username) {
    return reply(Boom.unauthorized());
  }

  db.User.update(user, {
    where: { id: user.id }
  }).then(function() {
    reply(user);
  }).catch(function(err) {
    reply(Boom.badImplementation());
  });
};

exports.attachAvatar = function(request, reply) {

  if(!request.payload.file) {
    return reply(Boom.badRequest());
  }

  var file = request.payload.file;

  var hash = generateToken(),
      filename = hash + (/(?:\.([^.]+))?$/.exec(file.hapi.filename)[0]);

  moveFileToUploadDirectory(file, filename, function(err) {

    if(err) {
      return reply(Boom.badImplementation());
    }

    var user = request.auth.credentials;

    db.Image.create({
      name: file.hapi.filename,
      url: '/uploads/' + filename,
      user_id: user.id
    }).then(function(image) {
      db.User.update({ avatar_id: image.id }, { where: { username: user.username } });

      reply().code(204);
    }).catch(function(err) {
      throw err;
      reply(Boom.badImplementation());
    });
  });
};

exports.attachCover = function(request, reply) {

  if(!request.payload.file) {
    return reply(Boom.badRequest());
  }

  var file = request.payload.file;

  var hash = generateToken(),
      filename = hash + (/(?:\.([^.]+))?$/.exec(file.hapi.filename)[0]);

  moveFileToUploadDirectory(file, filename, function(err) {

    if(err) {
      return reply(Boom.badImplementation());
    }

    var user = request.auth.credentials;

    db.Image.create({
      name: file.hapi.filename,
      url: '/uploads/' + filename,
      user_id: user.id
    }).then(function(image) {
      db.User.update({ cover_id: image.id }, { where: { username: user.username } });

      reply().code(204);
    }).catch(function(err) {
      throw err;
      reply(Boom.badImplementation());
    });
  });
};

exports.delete = function(request, reply) {

  var user = request.auth.credentials;

  if(user.username != request.params.username) {
    return reply(Boom.unauthorized());
  }

  user.destroy();

  reply(user);
};
