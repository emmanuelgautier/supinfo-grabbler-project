define([], function() {
  'use strict';

  return ['$httpProvider', '$routeProvider', '$locationProvider', 
    function($httpProvider, $routeProvider, $locationProvider) {
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true
      });

      $locationProvider.hashPrefix('!');
    }
  ];
});
