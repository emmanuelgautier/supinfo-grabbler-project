'use strict';

/*jshint maxlen: 1000 */

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env      = process.env.NODE_ENV || 'development',
    port     = process.env.PORT || 80;

var config = {
  env: env,
  root: rootPath,
  app: {
    name: 'gabbler',
    host: 'localhost',
    port: port,
    secret: 'key'
  },
  cookie: {
    name: 'sid',
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 3600000
  },
  db: {
    name: 'gabbler',
    username: 'root',
    password: null,
    dialect: 'mysql',
    port: 3306,
    models: {
      path: rootPath + '/app/models'
    }
  },
  logging: {
    interval: 1000,
    logDirPath: rootPath + '/logs',
    logPrefix: 'log',
    errorDirPath: rootPath + '/logs',
    errorPrefix: 'error'
  }
};

module.exports = config;
