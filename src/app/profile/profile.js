angular.module('starter.controllers')

.controller('ProfileCtrl', function($scope, $rootScope, AuthService, PictService, $state, ngFB, UserService) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.infoUser = function() {$rootScope.getInfo()};

  $scope.infoUser();

  $scope.user = UserService.getUser();

  $scope.showLogOutMenu = function() {
    var hideSheet = $ionicActionSheet.show({
      destructiveText: 'Logout',
      titleText: 'Êtes-vous sure de vouloir vous déconnecter ? On vous recommande de rester :).',
      cancelText: 'Cancel',
      cancel: function() {},
      buttonClicked: function(index) {
        return true;
      },
      destructiveButtonClicked: function(){
        $ionicLoading.show({
          template: 'Logging out...'
        });

        console.log('Choosing the good logging out way');

        if(typeof facebookConnectPlugin === 'undefined' || facebookConnectPlugin === null ){

          console.log('Proceding with standard logging out');

          AuthService.logout();
          UserService.logout();
          $ionicLoading.hide();
          $state.go('login');
        }
        else {

          console.log('Proceding with plugin logging out');
          // Facebook logout
          facebookConnectPlugin.logout(function(){
              UserService.logout();

              console.log('Successfully logged out !');
              $ionicLoading.hide();
              $state.go('login');
            },
            function(fail){
              console.log('Already logged out ?');
              $state.go('login');
              $ionicLoading.hide();
            });
        }




      }
    });
  };



  $scope.newPwd = function() {
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
               /* var alertPopup = $ionicPopup.alert({
                  title: 'Password Updated !',
                  template: msg
                });*/
              }, function(errMsg) {
                /*var alertPopup = $ionicPopup.alert({
                  title: 'Password Change Failed !',
                  template: errMsg
                });*/
              });
            };
          }
        },
        {
          text: '<b>Cancel</b>'
        }
      ]
    });
  };


  $scope.logout = function() {
/*    ngFB.logout();*/

/*

    var user= UserService.getUser();

*/

    $scope.showLogOutMenu();

  };


});
