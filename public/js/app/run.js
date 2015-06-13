define([], function() {
  'use strict';

  return ['$rootScope' '$authentication', 'FoundationApi',
    function ($rootScope $authentication, FoundationApi) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        for(var i in foundationRoutes) {
          if(next.indexOf(i) != -1) {
            if(foundationRoutes[i].auth === true && !$authentication.isAuthenticated()) {
              FoundationApi.publish('loginModal', 'open');

              event.preventDefault();
            }
          }
        }
      });
    }
  ];
});
