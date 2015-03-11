(function() {
  'use strict';

  angular.module('grabbler').factory('authentication', authentication);

  authentication.$inject = ['$http', '$q', '$window'];
  function authentication($http, $q, $window) {
    var user = {};
   
    function login(username, password) {
      var deferred = $q.defer();
   
      $http.post('/login', {
        username: username,
        password: password
      }).sucess(function(data) {
        user = data.user;

        $window.sessionStorage["user"] = JSON.stringify(user);

        deferred.resolve(user);
      }).error(function(error) {
        deferred.reject(error);
      });
   
      return deferred.promise;
    }

    function getUser() {
      return user;
    }

    return {
      login: login,
      getUser: getUser
    };
  }
})();
