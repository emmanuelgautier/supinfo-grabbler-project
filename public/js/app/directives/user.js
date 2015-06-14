define([], function() {
  'use strict';

  return ['$authentication', '$session', function($authentication, $session) {
    return {
      templateUrl: '/templates/components/user.html',
      scope: {
        user: "=model"
      },
      link: function ($scope, element, attrs) {
        $scope.$authentication = $authentication;
        $scope.$session = $session;
      }
    };
  }];
});
