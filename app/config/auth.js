'use strict';

module.exports = function(server, config) {

  server.register(require('hapi-auth-cookie'), function (err) {

      server.auth.strategy('session', 'cookie', {
          password: config.app.secret,
          cookie: 'sid',
          redirectTo: '/login',
          isSecure: false
      });
  });
};
