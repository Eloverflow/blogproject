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


app.run(function($rootScope,$http, API_ENDPOINT, AuthService,UserService, $sce, DEBUG) {

  openFB.init({appId: '1112318545481460'});


  $rootScope.getInfo = function () {
    $http.get(API_ENDPOINT.url + '/authentication/memberinfo').then(function (result) {
      $rootScope.user = result.data.user;

      if(DEBUG.isEnabled){
        console.log('User:');
        console.log(result.data.user);
      }
    });

  };

  /*If a Facebook user is stored load it*/
  if(UserService.getUser() != {} && UserService.getUser() != ""){
    if(DEBUG.isEnabled)
      console.log('Choosing Facebook Auth');

    $rootScope.user = UserService.getUser();
  }
  else {//Get standard user info
    if(DEBUG.isEnabled)
      console.log('Choosing Standard Auth');

    AuthService.startupAuthenticate();
    $rootScope.getInfo();
  }
  
  console.log('user');
  console.log($rootScope.user);
  
  $rootScope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
  }

  // This method is to get the user profile info from the facebook api
  $rootScope.getFacebookProfileInfo = function (authResponse) {
    console.log(authResponse);

    openFB.api({
      path: '/me',
      params: {fields: 'id,name,email,verified,gender,friends'},
      success: function(data) {

        if(DEBUG.isEnabled){
            console.log('Facebook User:');
            console.log(data);
        }

        UserService.setUser({
          authResponse: authResponse,
          userID: data.id,
          name: data.name,
          email: data.email,
          gender: data.gender,
          picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
        });

        //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
      },
      error: errorHandler});

  };

});

function errorHandler(error) {
  console.log(error.message);
}