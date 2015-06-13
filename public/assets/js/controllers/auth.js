define([], function() {
  'use strict';

  return ['$scope', '$http', '$location', '$authentication', 'FoundationApi',
    function($scope, $http, $location, $authentication, FoundationApi) {
      $scope.login = function() {

        $http.post('/login', {
          username: this.username,
          password: this.password
        }).success(function(data, status) {
          $scope.password = null;

          $authentication.setUser(data);

          FoundationApi.publish('loginModal', 'close');

          $location.path('/timeline');
        }).error(function(data, status) {
          $scope.password = null;
        });
      };

      $scope.register = function() {

        var user = {
          username:  this.username,
          email:     this.email,
          birthdate: this.birthdate,
          firstname: this.firstname,
          lastname:  this.lastname,
          gender:    this.gender,
          password:  this.password
        };

        $http.post('/register', user).success(function(data, status) {
          FoundationApi.publish('registerModal', 'close');
          FoundationApi.publish('loginModal', 'open');
        }).error(function(data, status) {

        });
      };

      $scope.logout = function() {

        $http.get('/logout').success(function() {
          $authentication.logout();
        });
      };
    }
  ];
});
