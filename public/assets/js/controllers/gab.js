define([], function() {
  'use strict';

  return ['$scope', '$http', '$stateParams', 'Gab', 'Follower', 'FoundationApi',
    function($scope, $http, $stateParams, Gab, Follower, FoundationApi) {
      $scope.list = function() {
        if(!$stateParams.user) {
          $http.get('/timeline').success(function(gabs) {
            console.log(gabs);
            $scope.gabs = gabs;
          });
        } else {

        }
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
