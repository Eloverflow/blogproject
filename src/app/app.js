'use strict';
// Declare app level module which depends on views, and components
var app  = angular.module('starter', ['starter.controllers','starter.services','starter.constants','ngRoute']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');


  $routeProvider.when('/posts', {
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  });


  $routeProvider.when('/post', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post/:id', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post-create', {
    templateUrl: 'post/create.html',
    controller: 'PostCreateCtrl'
  });
  $routeProvider.when('/post-edit/:id', {
    templateUrl: 'post/edit.html',
    controller: 'PostEditCtrl'
  });


  $routeProvider.when('/sign-in', {
    templateUrl: 'sign_in/sign_in.html',
    controller: 'LoginCtrl'
  });

  $routeProvider.when('/sign-up', {
    templateUrl: 'sign_in/sign_up.html',
    controller: 'LoginCtrl'
  });

  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/posts'});
}]);


app.run(function($rootScope,$http, API_ENDPOINT, AuthService,UserService) {

  openFB.init({appId: '1112318545481460'});

  $rootScope.getInfo = function () {
    $http.get(API_ENDPOINT.url + '/memberinfo').then(function (result) {
      $rootScope.user = result.data.user;
      console.log($rootScope.memberinfo);
      console.log(result.data.user);
    });

    console.log(UserService.getUser());
/*
    openFB.api({
      path: '/me?fields=email,name,gender&access_token=' + UserService.getUser().authResponse.accessToken,
      success: function(data) {
        console.log(JSON.stringify(data));
        $rootScope.user = {
          username: data.name,
          email: data.email
        };
        //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
      },
      error: errorHandler});*/
  };



  AuthService.startupAuthenticate();
  $rootScope.getInfo();

});

function errorHandler(error) {
  console.log(error.message);
}