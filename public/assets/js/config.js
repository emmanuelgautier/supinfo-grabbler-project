define([], function() {
  'use strict';

  return ['$httpProvider', '$routeProvider', '$locationProvider', 
    function($httpProvider, $routeProvider, $locationProvider) {
      $locationProvider.html5Mode({
        enabled:false,
        requireBase: false
      });

      $locationProvider.hashPrefix('!');

      /*$httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
        return {
          'request': function (config) {
            config.headers = config.headers || {};

            if ($localStorage.token) {
              config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }

            return config;
          },

          'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
              $location.path('/login');
            }

            return $q.reject(response);
          }
        };
      }]);*/
    }
  ];
});
