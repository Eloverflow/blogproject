angular.module('starter.controllers')
.controller('ProfileCtrl', function($scope, $rootScope, AuthService, $location, $routeParams, API_ENDPOINT, getReq) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.getPosts = function() {
    var $url = API_ENDPOINT.url + '/auth/'+ $routeParams.id +'/posts';

    var $callbackFunction = function (response) {
      $scope.posts = response;
    };

    getReq.send($url, null, $callbackFunction);
  };
  $scope.getPosts();


  $scope.newPwd = function() {
    bootbox.prompt("Change Password ?", function(result) {
      if (result === null) {
        // "Prompt dismissed"
      } else {
        AuthService.changePwd({password: result}).then(function (msg) {
        });
      }
    });
  };

});
