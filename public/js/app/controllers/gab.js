define([], function() {
  'use strict';

  return ['$scope', 'Gab', 'User', 'Follower', 'FoundationApi',
    function($scope, Gab, User, Follower, FoundationApi) {
      $scope.list = function() {

      };

      $scope.create = function() {};

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
