define([], function() {
  'use strict';

  return [function() {
    return {
      templateUrl: '/templates/components/user.html',
      scope: {
        user: "=model"
      },
    };
  }];
});
