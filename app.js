'use strict';

var Hapi    = require('hapi'),
    config  = require('./app/config/config'),

    db = require(config.root + '/app/config/db');

var server = new Hapi.Server();
server.connection({ port: config.app.port });

require(config.root + '/app/routes/')(server);

console.log('database is synchronising');
db.sequelize.sync().then(function() {
  server.start(function () {
      console.log('Server running at:', server.info.uri);
  });
});
