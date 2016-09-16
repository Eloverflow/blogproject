angular.module('starter.services', [])

.service('PictService', function($q, $http, API_ENDPOINT) {
    var changePict = function(user) {
        return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/auth/changePict/' + user._id, user).then(function(result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    return {
        changePict: changePict
    }
})
.service('EmailService', function($q, $http, API_ENDPOINT) {
    var resetPwd = function (user) {
        return $q(function (resolve, reject) {
            $http.get(API_ENDPOINT.url + '/auth/resetPwd/' + user.email).then(function (result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    return {
        resetPwd: resetPwd
    }
})

.service('AuthService', function($q, $http, API_ENDPOINT, DEBUG) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if(DEBUG.isEnabled){
            console.log('token:');
            console.log(token);
            console.log('isAuthenticated:');
            console.log(isAuthenticated);
        }

        if (token != undefined) {
            if(DEBUG.isEnabled)
                console.log('Authenticating with token');

            useCredentials(token);
        }
    }

    function storeUserCredentials(token) {
        /*
         console.log('token store :' + token);*/
        window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        useCredentials(token);
    }

    function useCredentials(token) {
        //console.log("token" + token);
        isAuthenticated = true;
        authToken = token;

        // Set the token as header for your requests!
        $http.defaults.headers.common.Authorization = authToken;
    }

    function destroyUserCredentials() {
        authToken = undefined;
        isAuthenticated = false;
        $http.defaults.headers.common.Authorization = undefined;
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
    }

    var startupAuthenticate = function(){
        loadUserCredentials();
    };

    var register = function(user) {
        return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/auth/signup', user).then(function(result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    var login = function(user) {
        return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/auth/authenticate', user).then(function(result) {
                if (result.data.success) {
                    storeUserCredentials(result.data.token);
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };


    var loginFacebook = function(user) {
        return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/auth/facebook', user).then(function(result) {
                if (result.data.success) {
                    storeUserCredentials(result.data.token);
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };

    var changePwd = function(user) {
        return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/auth/changePwd', user).then(function(result) {
                if (result.data.success) {
                    storeUserCredentials(result.data.token);
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    }

    var newPwd = function(user, token) {
        return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/auth/newPwd/'+ token, user).then(function(result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    }

    var logout = function() {
        destroyUserCredentials();
    };


    return {
        login: login,
        loginFacebook: loginFacebook,
        register: register,
        logout: logout,
        changePwd: changePwd,
        newPwd: newPwd,
        startupAuthenticate: startupAuthenticate,
        isAuthenticated: function() {return isAuthenticated;},
    };
})

.factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
            }[response.status], response);
            return $q.reject(response);
        }
    };
})

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
})

.factory('postReq', function ($http, $location, DEBUG) {

    return {
        send: function($url, $data, $callbackPath, $callbackFunction) {
            $http({
                url: $url,
                data: $data,
                method: "POST",
                crossDomain: true
            }).success(function (response) {
                if(DEBUG.isEnabled){
                    console.log($url + ' -> Returned:');
                    console.log(response);
                }

                if($callbackPath)
                    $location.path($callbackPath);

                if($callbackFunction)
                    $callbackFunction(response);

            }).error(function (response,status) {
                if(DEBUG.isEnabled){
                    console.log('Error: ');
                    console.log($url + ' -> Returned:');
                    console.log(response);
                }

                if(status == 403){
                    if(DEBUG.isEnabled) {
                        console.log('Emptying the token and redirecting to login')
                    }
                    AuthService.logout();
                    $location.path('/sign-in');
                }
                });
        }
    }
})
    .factory('putReq', function ($http, $location, DEBUG) {

        return {
            send: function($url, $data, $callbackPath, $callbackFunction) {
                $http({
                    url: $url,
                    data: $data,
                    method: "PUT",
                    crossDomain: true
                }).success(function (response) {
                    if(DEBUG.isEnabled){
                        console.log($url + ' -> Returned:');
                        console.log(response);
                    }

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction(response);

                })
                    .error(function (response,status) {
                        if(DEBUG.isEnabled){
                            console.log('Error: ');
                            console.log($url + ' -> Returned:');
                            console.log(response);
                        }
                        if(status == 403){
                            if(DEBUG.isEnabled) {
                                console.log('Emptying the token and redirecting to login')
                            }
                            AuthService.logout();
                            $location.path('/sign-in');
                        }
                    });
            }
        }
    })

    .factory('getReq', function ($http, $location, DEBUG) {

        return {
            send: function($url, $callbackPath, $callbackFunction) {
                $http({
                    method: "GET",
                    url: $url,
                    crossDomain: true
                }).success(function (response) {
                    if(DEBUG.isEnabled){
                        console.log($url + ' -> Returned:');
                        console.log(response);
                    }

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction(response);

                })
                    .error(function (response) {
                        if(DEBUG.isEnabled){
                            console.log('Error: ');
                            console.log($url + ' -> Returned:');
                            console.log(response);
                        }
                    });
            }
        }
    })

    .factory('delReq', function ($http, $location, DEBUG) {

        return {
            send: function($url, $callbackPath, $callbackFunction) {
                $http({
                    url: $url,
                    method: "DELETE",
                    crossDomain: true
                }).success(function (response) {
                    if(DEBUG.isEnabled){
                        console.log($url + ' -> Returned:');
                        console.log(response);
                    }

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction(response);

                })
                    .error(function (response, status) {
                        if(DEBUG.isEnabled){
                            console.log('Error: ');
                            console.log($url + ' -> Returned:');
                            console.log(response);
                        }

                        if(status == 403){
                            if(DEBUG.isEnabled) {
                                console.log('Emptying the token and redirecting to login')
                            }
                            AuthService.logout();
                            $location.path('/sign-in');
                        }
                    });
            }
        }
    })
