define([], function() {
  'use strict';

  return ['$http', '$session', function($http, $session) {
    var $authentication = {};

    $authentication.setUser = function(user) {
      $session.user = user;
    };

    $authentication.isAuthenticated = function() {
      return !!$session.user && !!$session.user.id;
    };

    $authentication.logout = function() {
      $session.user = null;
    };

    $http.get('/me').success(function(user) {
      $authentication.setUser(user);
    });

    return $authentication;
  }];
});
