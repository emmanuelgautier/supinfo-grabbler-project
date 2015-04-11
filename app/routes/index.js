'use strict';

var fs     = require('fs'),
    path   = require('path'),

    routes = [];

module.exports = function(server, config) {

  if(config.env === 'development') {
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: 'public'
            }
        }
    });
  }

  fs.readdirSync(__dirname)
    .filter(function(file) {
      return ((file.indexOf('.') !== 0) && 
              (file !== 'index.js') &&
              (file.slice(-3) === '.js'));
    })
    .forEach(function(file) {
      routes = require(path.join(__dirname, file));

      server.route(routes);
    });
};
