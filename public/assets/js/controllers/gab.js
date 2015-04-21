define([], function() {
  'use strict';

  return ['$scope', 'Gab', 'User', 'Follower',
    function($scope, Gab, Follower) {
      $scope.list = function() {

      };

      $scope.create = function() {

      };

      $scope.saveCreate = function() {
        var gab = new Gab({
          gab: this.gab
        });

        gab.$save(function(roomCreated) {
          FoundationApi.publish('createGabModal', 'close');
        });
      };
    }
  ];
});
