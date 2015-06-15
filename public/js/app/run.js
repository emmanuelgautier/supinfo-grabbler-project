define([], function() {
  'use strict';

  return ['$rootScope', '$location', '$authentication', 'FoundationApi',
    function ($rootScope, $location, $authentication, FoundationApi) {
      $rootScope.$on("$locationChangeStart", function(event, next, current) {
        if(next === $location.protocol() + '://' + location.host + '/#!' + '/' && !$authentication.isAuthenticated()) {
          FoundationApi.publish('loginModal', 'open');

          event.preventDefault();
        }

        for(var i in foundationRoutes) {
          if(i != '/' && next.indexOf(i) != -1) {
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
