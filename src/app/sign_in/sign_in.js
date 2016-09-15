angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $rootScope, postReq,  AuthService, $q, EmailService, $location, API_ENDPOINT, DEBUG, $routeParams) {

      // This is the fail callback from the login method
    var fbLoginError = function(error){
      console.log('fbLoginError', error);
      //$ionicLoading.hide();
    };

    $scope.goToSignIn = function () {
        $location.path('/sign-in');
    };

    $scope.goToSignUp = function () {
        $location.path('/sign-up');
    };

    $scope.user = {is_admin:"false"};

    $scope.signup = function() {
      AuthService.register($scope.user).then(function(msg) {
          if(DEBUG.isEnabled)
            console.log(msg)
          $location.path('/sign-in');
      }, function(errMsg) {
      });
    };


    $scope.fbLoginBrowser = function () {
        openFB.login(
        function (response) {
          if (response.status === 'connected') {
            console.log('Facebook login succeeded');
              
              if (!response.authResponse){
                  console.log("Cannot find the authResponse");
              }
              else{

                  var authResponse = response.authResponse;
                  $scope.getFacebookProfileInfo(authResponse, function (data) {
                          if(data.id != null){
                              AuthService.loginFacebook({
                                      userID: data.id,
                                      name: data.name,
                                      email: data.email,
                                      picture : "http://graph.facebook.com/" + data.id + "/picture?type=large"
                              }).then(function(msg) {
                                      AuthService.startupAuthenticate();
                                      $rootScope.getInfo();
                                      $location.path('/')
                                  }, function(errMsg) {
                              });
                          }
                          else {
                              console.log('No facebook profile info')
                          }
                  });
              }

          } else {
            alert('Facebook login failed');
          }
        },{scope: 'public_profile,email,publish_actions,user_friends'})
    };


    $scope.login = function() {
      AuthService.login($scope.user).then(function(msg) {
          AuthService.startupAuthenticate();
          $rootScope.getInfo();
          $location.path('/')
      }, function(errMsg) {
      });
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
        $scope.fbLoginBrowser();
    };

    $scope.logout = function() {
      AuthService.logout();
    };

    $scope.newPwd = function() {
        AuthService.newPwd($scope.user, $routeParams.token).then(function(msg) {
        }, function(errMsg) {
        });
    };
    
    $scope.forgotpwd = function() {
        EmailService.resetPwd($scope.user).then(function(msg) {
        }, function(errMsg) {
        });
    };

});
