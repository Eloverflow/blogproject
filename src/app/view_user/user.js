angular.module('starter.controllers')
    .controller('UserCtrl', function($scope, $rootScope, postReq, AuthService, getReq, putReq, $q, EmailService, $location, API_ENDPOINT, DEBUG, $routeParams, $parse) {

        // This is the fail callback from the login method
        var fbLoginError = function(error) {
            console.log('fbLoginError', error);
            //$ionicLoading.hide();
        };

        $scope.user = {
            is_admin: "false"
        };

        $scope.signup = function() {

            $scope.errorList = [];

            var fieldState = {
                username: 'VALID',
                email: 'VALID',
                password: 'VALID'
            };

            if ($scope.signUpForm.email.$error.required || !$scope.signUpForm.email) {
                fieldState.email = 'The email is required.';
            } else if ($scope.signUpForm.email.$error.pattern) {
                fieldState.email = 'The email is invalid.';
            }

            if ($scope.signUpForm.username.$error.required || !$scope.signUpForm.username) {
                fieldState.username = 'The username is required.';
            }

            if ($scope.signUpForm.password.$error.required || !$scope.signUpForm.password) {
                fieldState.password = 'The password is required.';
            } else if ($scope.signUpForm.password.$error.pattern) {
                fieldState.password = 'The password should contain 8 characters including one digit, one lowercase and one uppercase letter.';
            }

            for (var fieldName in fieldState) {
                var message = fieldState[fieldName];
                var serverMessage = $parse('signUpForm.' + fieldName + '.$error.serverMessage');

                if (message == 'VALID') {
                    $scope.signUpForm.$setValidity(fieldName, true, $scope.signUpForm);
                    serverMessage.assign($scope, undefined);
                } else {

                    $scope.signUpForm.$setValidity(fieldName, false, $scope.signUpForm);
                    serverMessage.assign($scope, fieldState[fieldName]);

                    $scope.errorList.push(fieldState[fieldName]);
                }
            }

            console.log($scope.errorList);

            if ($scope.errorList.length == 0) {
                AuthService.register($scope.user).then(function(msg) {
                    if (DEBUG.isEnabled)
                        console.log(msg)
                    $location.path('/sign-in');
                }, function(errMsg) {});
            }

        };

        $scope.addUser = function() {

            $scope.errorList = [];

            var fieldState = {
                username: 'VALID',
                email: 'VALID',
                password: 'VALID'
            };

            if ($scope.newUserForm.email.$error.required || !$scope.newUserForm.email) {
                fieldState.email = 'The email is required.';
            } else if ($scope.newUserForm.email.$error.pattern) {
                fieldState.email = 'The email is invalid.';
            }

            if ($scope.newUserForm.username.$error.required || !$scope.newUserForm.username) {
                fieldState.username = 'The username is required.';
            }

            if ($scope.newUserForm.password.$error.required || !$scope.newUserForm.password) {
                fieldState.password = 'The password is required.';
            } else if ($scope.newUserForm.password.$error.pattern) {
                fieldState.password = 'The password should contain 8 characters including one digit, one lowercase and one uppercase letter.';
            }

            for (var fieldName in fieldState) {
                var message = fieldState[fieldName];
                var serverMessage = $parse('newUserForm.' + fieldName + '.$error.serverMessage');

                if (message == 'VALID') {
                    $scope.newUserForm.$setValidity(fieldName, true, $scope.newUserForm);
                    serverMessage.assign($scope, undefined);
                } else {

                    $scope.newUserForm.$setValidity(fieldName, false, $scope.newUserForm);
                    serverMessage.assign($scope, fieldState[fieldName]);

                    $scope.errorList.push(fieldState[fieldName]);
                }
            }

            console.log($scope.errorList);

            if ($scope.errorList.length == 0) {
                $url = API_ENDPOINT.url + '/auth';


                $callbackFunction = function(response) {
                    if (response.success) {
                        $location.path('/profile/' + response.user._id);
                    }
                }

                postReq.send($url, $scope.user, null, $callbackFunction);
            }

        };

        $scope.getUser = function() {
            var $url = API_ENDPOINT.url + '/auth/' + $routeParams.id + '/profile';

            var $callbackFunction = function(response) {
                $scope.user = response;

                if (response.is_admin) {
                    $scope.user.is_admin = "true";
                } else {
                    $scope.user.is_admin = "false";
                }

                $scope.user.reset_password = "false";

            };

            getReq.send($url, null, $callbackFunction);
        };
        if ($routeParams.id) $scope.getUser();



        $scope.updateUser = function() {

            $scope.errorList = [];

            var fieldState = {
                username: 'VALID',
                email: 'VALID',
                password: 'VALID'
            };

            if ($scope.updateUserForm.email.$error.required || !$scope.updateUserForm.email) {
                fieldState.email = 'The email is required.';
            } else if ($scope.updateUserForm.email.$error.pattern) {
                fieldState.email = 'The email is invalid.';
            }

            if ($scope.updateUserForm.username.$error.required || !$scope.updateUserForm.username) {
                fieldState.username = 'The username is required.';
            }

            for (var fieldName in fieldState) {
                var message = fieldState[fieldName];
                var serverMessage = $parse('updateUserForm.' + fieldName + '.$error.serverMessage');

                if (message == 'VALID') {
                    $scope.updateUserForm.$setValidity(fieldName, true, $scope.updateUserForm);
                    serverMessage.assign($scope, undefined);
                } else {

                    $scope.updateUserForm.$setValidity(fieldName, false, $scope.updateUserForm);
                    serverMessage.assign($scope, fieldState[fieldName]);

                    $scope.errorList.push(fieldState[fieldName]);
                }
            }

            console.log($scope.errorList);

            if ($scope.errorList.length == 0) {
                $url = API_ENDPOINT.url + '/auth/' + $routeParams.id;


                $callbackFunction = function(response) {
                    if (response.success) {
                        $location.path('/profile/' + response.user._id);
                    }
                }

                putReq.send($url, $scope.user, null, $callbackFunction);
            }

        };


        $scope.fbLoginBrowser = function() {
            openFB.login(
                function(response) {
                    if (response.status === 'connected') {
                        console.log('Facebook login succeeded');

                        if (!response.authResponse) {
                            console.log("Cannot find the authResponse");
                        } else {

                            var authResponse = response.authResponse;
                            $scope.getFacebookProfileInfo(authResponse, function(data) {
                                if (data.id != null) {
                                    AuthService.loginFacebook({
                                        userID: data.id,
                                        name: data.name,
                                        email: data.email,
                                        picture: "http://graph.facebook.com/" + data.id + "/picture?type=large"
                                    }).then(function(msg) {
                                        AuthService.startupAuthenticate();
                                        $rootScope.getInfo();
                                        $location.path('/')
                                    }, function(errMsg) {});
                                } else {
                                    console.log('No facebook profile info')
                                }
                            });
                        }

                    } else {
                        alert('Facebook login failed');
                    }
                }, {
                    scope: 'public_profile,email,publish_actions,user_friends'
                })
        };


        $scope.login = function() {
            $scope.errorList = [];

            AuthService.login($scope.user).then(function(msg) {
                AuthService.startupAuthenticate();
                $rootScope.getInfo();
                $location.path('/')
            }, function(errMsg) {
                if (!errMsg.success)
                    $scope.errorList.push(errMsg.msg);
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
            $scope.msgList = [];
            $scope.errorList = [];
            AuthService.newPwd($scope.user, $routeParams.token).then(function(result) {
                if (result.success){
                    $scope.msgList.push(result.msg);
                    setTimeout(function(){
                        $location.path('/sign-in')
                    },10);
                }
            }, function(errMsg) {
                if (!errMsg.success)
                    $scope.errorList.push(errMsg.msg);
            });
        };

        $scope.forgotpwd = function() {
            $scope.msgList = [];
            $scope.errorList = [];
            EmailService.resetPwd($scope.user).then(function(result) {
                if (result.success){
                    $scope.msgList.push(result.msg);
                }
            }, function(errMsg) {
                if (!errMsg.success)
                    $scope.errorList.push(errMsg.msg);
            });
        };

    });