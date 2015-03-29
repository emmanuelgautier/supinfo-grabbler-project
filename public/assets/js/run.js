define([], function() {
  'use strict';

  return ['$rootScope', '$location', '$authentication',
    function ($rootScope, $location, $authentication) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        for(var i in foundationRoutes) {
          if(next.indexOf(i) != -1) {
            if(foundationRoutes[i].auth === true && !$authentication.isAuthenticated()) {
              $location.path("/login");

              event.preventDefault();
            }
          }
        }
      });
    }
  ];
});
