define([], function() {
  'use strict';

  return ['$scope', '$http', '$resource', '$stateParams', 'Gab', 'FoundationApi',
    function($scope, $http, $resource, $stateParams, Gab, FoundationApi) {

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

      $scope.favorite = function(id) {

        $resource('/gabs/:id/favorite').get({ id: id });
      };

      $scope.unfavorite = function(id) {

        $resource('/gabs/:id/unfavorite').get({ id: id });
      };

      $scope.delete = function(id) {

        $http.delete('/gabs/' + id);
      };
    }
  ];
});
