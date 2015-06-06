define([], function() {
  'use strict';

  return ['$scope', '$authentication', '$session',
    function($scope, $authentication, $session) {
      $scope.$authentication = $authentication;
      $scope.$session = $session;
    }
  ];
});
