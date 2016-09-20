angular.module('starter.controllers')
    .controller('AboutCtrl', function($scope, $rootScope, AuthService, $location, $routeParams, API_ENDPOINT, getReq) {
      $scope.settings = {
        enableFriends: true
      };

    })
