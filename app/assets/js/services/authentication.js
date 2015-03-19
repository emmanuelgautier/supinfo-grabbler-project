define([], function() {
  'use strict';

  return ['$session', function($session) {
    var $authentication = {};

    $authentication.isAuthenticated = function() {
      return !!$session.user && !!$session.user.id;
    };

    return $authentication;
  }];
});
