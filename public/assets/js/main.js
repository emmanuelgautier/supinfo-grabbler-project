require.onError = function() {

};

require(['angular', 'foundation', 'app/app'], 
  function(angular, foundation, app) {
    'use strict';

    angular.element(document).ready(function() {
    	setTimeout(function() {
    		angular.bootstrap(document, ['gabbler']);
    	}, 500);
    });
  }
);
