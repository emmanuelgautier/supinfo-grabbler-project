define([
    'require', 'angular',
    'app/routes', 'app/config', 'app/run',
    'app/services/authentication', 'app/services/session',
    'app/resources/follower', 'app/resources/gab', 'app/resources/user',
    'app/controllers/auth'
  ],

  function(
    require, angular,
    routes, config, run,
    $authentication, $session,
    Follower, Gab, User,
    AuthController
  ) {
    'use strict';

    var app = angular.module('gabbler', [
      'ngRoute',
      'ngResource',

      'ui.router',
      'ngAnimate',

      //foundation
      'foundation',
      'foundation.dynamicRouting',
      'foundation.dynamicRouting.animations'
    ]);

    app.config(config);

    //load factories
    app.factory('$authentication', $authentication)
      .factory('$session', $session)
      .factory('Follower', Follower)
      .factory('Gab', Gab)
      .factory('User', User);

    //load controllers
    app.controller('AuthController', AuthController);

    app.run(run);

    return app;
  });
