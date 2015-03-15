(function() {
  'use strict';

  angular.module('grabbler').factory('Followers', Followers);

  Followers.$inject = ['$resource'];
  function Followers($resource) {
      return $resource('/followers/:user_id');
  }
})();
