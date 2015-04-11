'use strict';

var Hapi    = require('hapi'),
    config  = require('./app/config/config'),

    db = require('./app/config/db');

var server = new Hapi.Server();
server.connection({ port: config.app.port });

require('./app/config/hapi')(server, config);
require('./app/config/auth')(server, config);
require('./app/routes/')(server, config);

console.log('database is synchronising');
db.sequelize.sync().then(function() {
  server.start(function () {
      console.log('Server running at:', server.info.uri);
  });
});
