'use strict';

/*jshint maxlen: 1000 */

var path     = require('path'),
    rootPath = path.normalize(__dirname + '/../..'),
    env      = process.env.NODE_ENV || 'development';

var config = {
  env: env,
  root: rootPath,
  app: {
    name: 'grabbler',
  },
  db: {
    name: 'grabbler',
    username: 'root',
    password: null,
    dialect: 'mysql',
    port: 3306,
    models: {
      path: rootPath + '/app/models'
    }
  }
};

module.exports = config;
