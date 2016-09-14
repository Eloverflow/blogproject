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

  $scope.showLogOutMenu = function() {
    bootbox.dialog({
      message: "Are you sure?",
      title: "Log off",
      backdrop: true,
      buttons: {
        cancel: {
          label: "No",
          className: "btn-danger",
          callback: function() {
          }
        },
        logoff: {
          label: "Yes!",
          className: "btn-success",
          callback: function() {
            console.log('Proceding with standard logging out');

            AuthService.logout();

            $rootScope.$apply(function() {
              $rootScope.user = null;
              $location.path('/sign-in');
            });

          }
        }
      }
    });
  };

  $scope.newPwd = function() {
    bootbox.prompt("Change Password ?", function(result) {
      if (result === null) {
        // "Prompt dismissed"
      } else {
        AuthService.changePwd(result).then(function (msg) {
        });
      }
    });
  };

  $scope.logout = function() {
    $scope.showLogOutMenu();
  };

});
