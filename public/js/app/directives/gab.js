define([], function() {
  'use strict';

  return [function() {
    return {
      templateUrl: '/templates/components/gab.html',
      scope: {
        gab: "=model"
      }
    };
  }];
});
