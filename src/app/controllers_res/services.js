angular.module('starter.services', [])


.service('UserService', function() {
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var setUser = function(user_data) {
        window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.starter_facebook_user || '{}');
    };

    var logout = function(){
        window.localStorage.starter_facebook_user = JSON.stringify("");
    };

    return {
        getUser: getUser,
        setUser: setUser,
        logout: logout
    };
})
.service('PictService', function($q, $http, API_ENDPOINT) {
    var changePict = function(user) {
        return $q(function(resolve, reject) {
            $http.put(API_ENDPOINT.url + '/changePict/' + user._id, user).then(function(result) {
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
            $http.get(API_ENDPOINT.url + '/resetPwd/' + user.email, user).then(function (result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };
})

.service('AuthService', function($q, $http, API_ENDPOINT) {
    var LOCAL_TOKEN_KEY = 'yourTokenKey';
    var isAuthenticated = false;
    var authToken;

    function loadUserCredentials() {
        var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        console.log('token :' + token);

        console.log(isAuthenticated);
        if (token != undefined) {
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
        console.log("token" + token);
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
            $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
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
            $http.post(API_ENDPOINT.url + '/authenticate', user).then(function(result) {
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
            $http.put(API_ENDPOINT.url + '/changePwd/' + user._id, user).then(function(result) {
                if (result.data.success) {
                    storeUserCredentials(result.data.token);
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

    loadUserCredentials();

    return {
        login: login,
        register: register,
        logout: logout,
        changePwd: changePwd,
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

.service('PostsService', function($q, $http, API_ENDPOINT) {
    var createPost = function(post) {
        return $q(function(resolve, reject) {
            $http.post(API_ENDPOINT.url + '/createPost', post).then(function(result) {
                if (result.data.success) {
                    resolve(result.data.msg);
                } else {
                    reject(result.data.msg);
                }
            });
        });
    };
});

/*

.factory('postReq', function ($http, $location) {

    return {
        send: function($url, $data, $callbackPath, $callbackFunction) {
            $http({
                url: $url,
                method: "POST",
                data: $data
            }).success(function (data) {/!*
             console.log(data);*!/

                if($callbackPath)
                    $location.path($callbackPath);

                if($callbackFunction)
                    $callbackFunction(data);

            })
                .error(function (data) {
                    console.log('Error: ' + data);
                });
        }
    }
})

    .factory('putReq', function ($http, $location) {

        return {
            send: function($url, $data, $callbackPath, $callbackFunction) {
                $http({
                    url: $url,
                    method: "PUT",
                    data: $data
                }).success(function (data) {/!*
                 console.log(data);*!/

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction();

                })
                    .error(function (data) {
                        console.log('Error: ' + data);
                    });
            }
        }
    })

    .factory('getReq', function ($http, $location) {

        return {
            send: function($url, $callbackPath, $callbackFunction) {
                $http({
                    method: "GET",
                    crossDomain: true,
                    url: $url
                }).success(function (response) {/!*
                 console.log(response);*!/

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction(response);

                })
                    .error(function (response) {
                        console.log('Error: ' + response);
                    });
            }
        }
    })

    .factory('delReq', function ($http, $location) {

        return {
            send: function($url, $callbackPath, $callbackFunction) {
                $http({
                    method: "DELETE",
                    crossDomain: true,
                    url: $url
                }).success(function (response) {/!*
                 console.log(response);*!/

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction(response);

                })
                    .error(function (response) {
                        console.log('Error: ' + response);
                    });
            }
        }
    })*/
