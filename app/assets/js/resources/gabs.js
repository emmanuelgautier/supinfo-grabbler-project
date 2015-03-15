(function() {
  'use strict';

  angular.module('grabbler').factory('Gabs', Gabs);

  Gabs.$inject = ['$resource'];
  function Gabs($resource) {
      return $resource('/gabs/:id');
  }
})();
