angular.module('starter.controllers', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/sign-in', {
            templateUrl: 'sign_in/sign_in.html',
            controller: 'LoginCtrl'
        });
    }])

.controller('LoginCtrl', function($scope, $rootScope, UserService,  AuthService, $q, EmailService) {

    var fbLoginSuccess = function(response) { 
      if (!response.authResponse){
        fbLoginError("Cannot find the authResponse");
        return;
      }

      var authResponse = response.authResponse;

      getFacebookProfileInfo(authResponse)
        .then(function(profileInfo) {
          // For the purpose of this example I will store user data on local storage
          UserService.setUser({
            authResponse: authResponse,
            userID: profileInfo.id,
            name: profileInfo.name,
            email: profileInfo.email,
            gender: profileInfo.gender,
            picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
          });
          //$ionicLoading.hide();
          //$state.go('tab.home');
        }, function(fail){
          // Fail get profile info
          console.log('profile info fail', fail);
        });
    };

    // This is the fail callback from the login method
    var fbLoginError = function(error){
      console.log('fbLoginError', error);
      //$ionicLoading.hide();
    };

    // This method is to get the user profile info from the facebook api
    var getFacebookProfileInfo = function (authResponse) {
      var info = $q.defer();

      /*facebookConnectPlugin.api('/me?fields=email,name,gender&access_token=' + authResponse.accessToken, null,
        function (response) {
          console.log(response);
          info.resolve(response);
        },
        function (response) {
          console.log(response);
          info.reject(response);
        }
      );*/
      return info.promise;
    };

    $scope.user = {};

    // when submitting the add form, send the text to the node API
    /*$scope.signup = function() {
      $http.post('http://159.203.125.56/api/signup', $scope.user)
        .success(function(data) {
          $scope.user = {}; // clear the form so our user is ready to enter another
          console.log(data);
        })
        .error(function(data) {
          console.log('Error: ' + data);
        });
    };*/
    $scope.signup = function() {
      AuthService.register($scope.user).then(function(msg) {
        //$state.go('tab.home');
       /* var alertPopup = $ionicPopup.alert({
          title: 'Register success!',
          template: msg
        });*/
      }, function(errMsg) {
       /* var alertPopup = $ionicPopup.alert({
          title: 'Register failed!',
          template: errMsg
        });*/
      });
    };

    $scope.fbLoginBrowser = function () {
      /*ngFB.login({scope: 'public_profile,email,publish_actions,user_friends'}).then(
        function (response) {
          if (response.status === 'connected') {
            console.log('Facebook login succeeded');

            $scope.closeLogin();
          } else {
            alert('Facebook login failed');
          }
        })*/
    };


    $scope.login = function() {
      AuthService.login($scope.user).then(function(msg) {
       /* var alertPopup = $ionicPopup.alert({
          title: 'Login success!',
          template: msg
        });
        $state.go('tab.home');*/
      }, function(errMsg) {
      /*  var alertPopup = $ionicPopup.alert({
          title: 'Login failed!',
          template: errMsg
        });*/
      });
    };

    //This method is executed when the user press the "Login with facebook" button
    $scope.facebookSignIn = function() {
     /* if(typeof facebookConnectPlugin === 'undefined' || facebookConnectPlugin === null )
      {
        $scope.fbLoginBrowser();
      }
      else{
        facebookConnectPlugin.getLoginStatus(function(success){
          if(success.status === 'connected'){
            // The user is logged in and has authenticated your app, and response.authResponse supplies
            // the user's ID, a valid access token, a signed request, and the time the access token
            // and signed request each expire
            console.log('getLoginStatusFirst', success.status);

            // Check if we have our user saved
            var user = UserService.getUser();

            $scope.user = user;
            console.log('user : ' +user.toString);

            $scope.user.picture = "http://graph.facebook.com/" + $scope.user.id + "/picture?width=270&height=270";

            if(!user.userID){
              getFacebookProfileInfo(success.authResponse)
                .then(function(profileInfo) {
                  // For the purpose of this example I will store user data on local storage
                  UserService.setUser({
                    authResponse: success.authResponse,
                    userID: profileInfo.id,
                    name: profileInfo.name,
                    email: profileInfo.email,
                    gender: profileInfo.gender,
                    picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
                  });

                  $scope.user = profileInfo;
                  console.log(user);

                  $scope.user.picture = "http://graph.facebook.com/" + $scope.user.id + "/picture?width=270&height=270";

                  $state.go('tab.home');
                }, function(fail){
                  // Fail get profile info
                  console.log('profile info fail', fail);
                });
            }else{
              $state.go('tab.home');
            }
          } else {
            // If (success.status === 'not_authorized') the user is logged in to Facebook,
            // but has not authenticated your app
            // Else the person is not logged into Facebook,
            // so we're not sure if they are logged into this app or not.

            console.log('getLoginStatusSecond', success.status);

            $ionicLoading.show({
              template: 'Logging in...'
            });

            // Ask the permissions you need. You can learn more about
            // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
            facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
          }
        })

      }*/
    };

    $scope.closeLogin = function() {
      //$state.go('tab.home');
    };

    $scope.forgotpwd = function() {
      EmailService.resetPwd($scope.user).then(function(msg) {
        /*var alertPopup = $ionicPopup.alert({
          title: 'Reset Password Success!',
          template: msg
        });*/
      }, function(errMsg) {
        /*var alertPopup = $ionicPopup.alert({
          title: 'Reset Password Failed!',
          template: errMsg
        });*/
      });

    };



    $scope.closeLogin = function() {
      //$state.go('tab.account');
    };

    $scope.logout = function() {
     /* facebookConnectPlugin.logout();*//*
      UserService.logout('facebook');*/
      AuthService.logout();
     // $state.go('login');
    };



    /*
        $scope.login = function() {
          console.log($scope.user);
          $http({
            url: 'http://159.203.125.56/api/authentication/authenticate',
            method: "POST",
            data: $scope.user

          }).success(function(data) {
              $scope.user = {}; // clear the form so our user is ready to enter another
              console.log(data);
            })
            .error(function(data) {
              console.log('Error: ' + data);
            });
        };*/
  });
