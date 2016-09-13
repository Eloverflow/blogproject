angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $rootScope, UserService, postReq,  AuthService, $q, EmailService, $location, API_ENDPOINT, DEBUG) {

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

                      $callbackfunction = function (response) {
                          if(response.facebook_id != null){

                              var credentials = response

                              credentials.password = 'facebookUser';
                              console.log(credentials);
                              AuthService.login(credentials)


                              UserService.setUser({
                                  _id:credentials._id,
                                  authResponse: authResponse,
                                  userID: data.id,
                                  name: data.name,
                                  email: data.email,
                                  gender: data.gender,
                                  createdAt: response.createdAt,
                                  picture : "http://graph.facebook.com/" + data.id + "/picture?type=large"
                              });

                              $rootScope.seshUser = UserService.getUser();

                              $location.path('/');
                          }
                          else {
                              console.log('Email alraedy taken')
                          }
                      };


                      $url = API_ENDPOINT.url + '/facebook';
                      $data = {
                          userID: data.id,
                          name: data.name,
                          email: data.email,
                          picture : "http://graph.facebook.com/" + data.id + "/picture?type=large"
                      }

                      postReq.send($url, $data, null, $callbackfunction)

                  });


                  

                  /*$rootScope.$apply(function() {
                      $location.path('/')
                  });*/
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

    $scope.forgotpwd = function() {
        EmailService.resetPwd($scope.user).then(function(msg) {
        }, function(errMsg) {
        });
    };

});
