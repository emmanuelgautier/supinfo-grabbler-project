require(['angular', 'foundation', 'app/app'], 
  function(angular, foundation, app) {
    'use strict';

    angular.element(document).ready(function() {
      angular.bootstrap(document, ['gabbler']);
    });
  }
);
