define([], function() {
  'use strict';

  return ['$scope', '$stateParams', '$http', 'Upload', '$resource', 'FoundationApi', '$session', '$authentication', 'User', 'Gab',
    function($scope, $stateParams, $http, Upload, $resource, FoundationApi, $session, $authentication, User, Gab) {
      $scope.show = function() {

        $scope.user = User.get({ username: $stateParams.username });
      };

      $scope.gabs = function() {

        $scope.gabs = Gab.query({ user: $stateParams.username });
      };

      $scope.edit = function() {

        User.get({ username: $stateParams.username }, function(user) {

          $scope.user = user;
            user.birthdate = new Date(user.birthdate);

          if($session.user.username != $scope.user.username) {
            $location.path('/users/' + $scope.user.username);
          }
        });
      };

      $scope.saveEdit = function() {

        if($session.user.username != this.user.username) {
          $location.path('/users/' + this.user.username);
        }

        User.update({ username: $session.user.username }, this.user).success(function() {

          $authentication.retrieveUser();
        }).error(function(data, status) {
          FoundationApi.publish('danger-notification', { title: 'Error', content: data.message });
        });
      };

      $scope.saveEditAvatar = function() {

        if(!this.avatar || this.avatar.length === 0) {
          return;
        }

        Upload.upload({
          url: '/users/' + $stateParams.username + '/avatar',
          file: $scope.avatar[0]
        }).success(function (data, status, headers, config) {
          FoundationApi.publish('success-notification', { title: 'Edited', content: 'Avatar is changed !' });

          $authentication.retrieveUser();
        }).error(function(data, status) {
          FoundationApi.publish('danger-notification', { title: 'Error', content: data.message });
        });
      };

      $scope.saveEditCover = function(file) {

        if(!this.cover || this.cover.length === 0) {
          return;
        }

        Upload.upload({
          url: '/users/' + $stateParams.username + '/cover',
          file: $scope.cover[0]
        }).success(function (data, status, headers, config) {
          FoundationApi.publish('success-notification', { title: 'Edited', content: 'Cover is changed !' });

          $authentication.retrieveUser();
        }).error(function(data, status) {
          FoundationApi.publish('danger-notification', { title: 'Error', content: data.message });
        });
      };

      $scope.search = function() {
        //
      };

      $scope.saveSearch = function() {

        $http.get('/users?username=' + $scope.searchUsername).success(function(users) {
          $scope.users = users;
        });
      };

      $scope.followers = function() {

        $scope.followers = $resource('/users/:username/followers').query({ username: $stateParams.username });
      };

      $scope.following = function() {

        $scope.following = $resource('/users/:username/following').query({ username: $stateParams.username });
      };

      $scope.follow = function(username) {

        $resource('/follow/:username').get({ username: username }, function() {
          FoundationApi.publish('success-notification', { title: 'New follow', content: 'You follow ' + username + ' now !' });
        });
      };

      $scope.unfollow = function(username) {

        $resource('/unfollow/:username').get({ username: username }, function() {
          FoundationApi.publish('success-notification', { title: 'New follow', content: 'You unfollow ' + username + ' now !' });
        });
      };
    }
  ];
});
