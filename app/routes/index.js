'use strict';

var fs     = require('fs'),
    path   = require('path'),

    router = {};

module.exports = function(app) {
  fs.readdirSync(__dirname)
    .filter(function(file) {
      return ((file.indexOf('.') !== 0) && 
              (file !== 'index.js') && 
              (file.slice(-3) === '.js'));
    })
    .forEach(function(file) {
      router = require(path.join(__dirname, file));

      app.use(router.use, router.router);
    });
};
