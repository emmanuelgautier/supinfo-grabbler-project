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

        gab.$save(function(gabCreated) {
          FoundationApi.publish('createGabModal', 'close');

          FoundationApi.publish('success-notification', { title: 'New gab', content: 'Gab is posted successful !' });

          $scope.gab = "";
        });
      };

      $scope.favorite = function(id) {

        $resource('/gabs/:id/favorite').get({ id: id }, function() {
          FoundationApi.publish('success-notification', { title: 'Gab favorited', content: 'You favorite this gab !' });
        });
      };

      $scope.unfavorite = function(id) {

        $resource('/gabs/:id/unfavorite').get({ id: id }, function() {
          FoundationApi.publish('success-notification', { title: 'Gab favorited', content: 'You unfavorite this gab !' });
        });
      };

      $scope.delete = function(id) {

        $http.delete('/gabs/' + id).success(function() {
          FoundationApi.publish('success-notification', { title: 'Gab Deleted', content: 'Gab is deleted successful !' });
        });
      };
    }
  ];
});
