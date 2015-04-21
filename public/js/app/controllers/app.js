define([], function() {
  'use strict';

  return ['$scope', '$authentication', '$session', 'User',
    function($scope, $authentication, $session, User) {
      $scope.$authentication = $authentication;
      $scope.$session = $session;
    }
  ];
});
