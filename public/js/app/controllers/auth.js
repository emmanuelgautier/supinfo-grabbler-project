define([], function() {
  'use strict';

  return ['$scope', '$http', '$location', '$session',
    function($scope, $http, $location, $session) {
      $scope.login = function() {
        $http.post('/login', {
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          birthdate: this.birthdate
        }).success(function(data, status) {
          $session.user = data;
        }).error(function(data, status) {
          this.password = null;
        });
      };

      $scope.register = function() {
        $http.post('/register', {
          username: this.username,
          password: this.password,
          password_confirmation: this.password_confirmation
        }).success(function(data, status) {

        }).error(function(data, status) {

        });
      };

      $scope.logout = function() {
        $http.get('/logout');

        $session.user = null;
      };
    }
  ];
});
