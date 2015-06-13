define([], function() {
  'use strict';

  return ['$scope', '$stateParams', '$session', 'User', 'Gab',
    function($scope, $stateParams, $session, User, Gab) {
      $scope.show = function() {

        User.get({ username: $stateParams.username }, function(user) {

          $scope.user = user;

          $scope.gabs = Gab.query({ user: $stateParams.username });
        });
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
    }
  ];
});
