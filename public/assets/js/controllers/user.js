define([], function() {
  'use strict';

  return ['$scope', '$stateParams', '$http', '$resource', '$session', 'User', 'Gab',
    function($scope, $stateParams, $http, $resource, $session, User, Gab) {
      $scope.show = function() {

        $scope.user = User.get({ username: $stateParams.username });
      };

      $scope.gabs = function() {

        $scope.gabs = Gab.query({ user: $stateParams.username });
      };

      $scope.edit = function() {

        User.get({ username: $stateParams.username }, function(user) {

          $scope.user = user;
            user.birthdate = new Date(user.birthdate);

          if($session.user.username != $scope.user.username) {
            $location.path('/users/' + $scope.user.username);
          }
        });
      };

      $scope.saveEdit = function() {

        if($session.user.username != this.user.username) {
          $location.path('/users/' + this.user.username);
        }

        User.update({ username: $session.user.username }, this.user);
      };

      $scope.search = function() {
        //
      };

      $scope.saveSearch = function() {

        $http.get('/users?username=' + $scope.searchUsername).success(function(users) {
          $scope.users = users;
        });
      };

      $scope.followers = function() {

        $scope.users = $resource('/users/:username/followers').get({ username: $stateParams.username });
      };

      $scope.following = function() {

        $scope.users = $resource('/users/:username/following').get({ username: $stateParams.username });
      };

      $scope.follow = function(username) {

        $resource('/follow/:username').get({ username: username });
      };

      $scope.unfollow = function(username) {

        $resource('/unfollow/:username').get({ username: username });
      };
    }
  ];
});
