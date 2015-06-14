define([], function() {
  'use strict';

  return ['$session', function($session) {
    return {
      templateUrl: '/templates/components/gab.html',
      scope: {
        gab: "=model"
      },
      link: function ($scope, element, attrs) {
        $scope.$session = $session;
      }
    };
  }];
});
