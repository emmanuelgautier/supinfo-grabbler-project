define([
    'require', 'angular',
    'app/routes', 'app/config', 'app/run',
    'app/services/authentication', 'app/services/session',
    'app/resources/follower', 'app/resources/gab', 'app/resources/user',
    'app/directives/gab', 'app/directives/user',
    'app/controllers/app', 'app/controllers/auth', 'app/controllers/user', 'app/controllers/gab'
  ],

  function(
    require, angular,
    routes, config, run,
    $authentication, $session,
    Follower, Gab, User,
    GabDirective, UserDirective,
    AppController, AuthController, UserController, GabController
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
    app.controller('AuthController', AuthController)
      .controller('AppController', AppController)
      .controller('UserController', UserController)
      .controller('GabController', GabController);

    //load directive
    app.directive('gab', GabDirective)
      .directive('user', UserDirective);

    app.run(run);

    return app;
  });
