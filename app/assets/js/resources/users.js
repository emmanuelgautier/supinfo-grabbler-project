(function() {
  'use strict';

  angular.module('grabbler').factory('Users', Users);

  Users.$inject = ['$resource'];
  function Users($resource) {
      return $resource('/users/:username');
  }
})();
