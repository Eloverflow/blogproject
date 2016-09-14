angular.module('starter.controllers')
.controller('ProfileCtrl', function($scope, $rootScope, AuthService, UserService, $location, $routeParams, API_ENDPOINT, getReq) {
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
            UserService.logout();

            $rootScope.$apply(function() {
              $rootScope.user = null;
              $location.path('/sign-in');
            });

          }
        }
      }
    });
  };

  $scope.newPwd = function() {/*
    var myPopup = $ionicPopup.show({
      template: '<label class="item item-input">' +
                '<input type="password" placeholder="New Password">' +
                '</label>' +
                '<label class="item item-input">' +
                '<input type="password" placeholder="Confirm Password" ng-model="user.password">' +
                '</label>',
      title: 'Change Password',
      scope: $scope,
      buttons: [
        {
          text: 'Save',
          type: 'button-balanced',
          onTap: function(e) {
            if (!$scope.user.password) {
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
                AuthService.changePwd($scope.user).then(function(msg) {
              }, function(errMsg) {
              });
            };
          }
        },
        {
          text: '<b>Cancel</b>'
        }
      ]
    });*/
  };


  $scope.logout = function() {
/*    ngFB.logout();*/

/*

    var user= UserService.getUser();

*/

    $scope.showLogOutMenu();

  };


});
