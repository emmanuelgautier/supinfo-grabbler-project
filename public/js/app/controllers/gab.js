define([], function() {
  'use strict';

  return ['$scope', '$http', '$stateParams', 'Gab', 'Follower', 'FoundationApi',
    function($scope, $http, $stateParams, Gab, Follower, FoundationApi) {

      $scope.list = function() {

        $http.get('/timeline').success(function(gabs) {
          $scope.gabs = gabs;
        });
      };

      $scope.create = function() {
        //
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
