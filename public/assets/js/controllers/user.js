define([], function() {
  'use strict';

  return ['$scope', '$stateParams', '$session', 'User',
    function($scope, $stateParams, $session, User) {
      $scope.list = function() {

      };

      $scope.show = function(username) {
        username = username | $stateParams.username;

        
      };

      $scope.edit = function() {

      };

      $scope.saveEdit = function() {

      };
    }
  ];
});
