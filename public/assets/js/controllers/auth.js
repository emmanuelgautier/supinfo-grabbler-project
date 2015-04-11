define([], function() {
  'use strict';

  return ['$scope', '$http', '$location',
    function($scope, $http, $location) {
      $scope.login = function() {
        $http.post('/login', {
          username: this.username,
          password: this.password
        });
      };

      $scope.register = function() {
        $http.post('/register', {
          username: this.username,
          password: this.password,
          password_confirmation: this.password_confirmation
        });
      };

      $scope.logout = function() {
        $http.get('/logout');
      };
    }
  ];
});
