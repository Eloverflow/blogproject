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

  $routeProvider.when('/profile/:id', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/posts'});
}]);


app.run(function($rootScope,$http, API_ENDPOINT, AuthService,UserService, $sce, DEBUG, $location) {

  openFB.init({appId: '1112318545481460'});


  $rootScope.getInfo = function () {
    $http.get(API_ENDPOINT.url + '/authentication/memberinfo').then(function (result) {
      $rootScope.seshUser = result.data.user;

      if(DEBUG.isEnabled){
        console.log('User:');
        console.log(result.data.user);
      }
    });

  };


  AuthService.startupAuthenticate();

  /*If a Facebook user is stored load it*/
  if(UserService.getUser() != {} && UserService.getUser() != ""){
    if(DEBUG.isEnabled)
      console.log('Choosing Facebook Auth');

    $rootScope.seshUser = UserService.getUser();
  }
  else if(AuthService.isAuthenticated()){//Get standard user info
    if(DEBUG.isEnabled)
      console.log('Choosing Standard Auth');

    $rootScope.getInfo();
  }
  
  $rootScope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
  }

  $rootScope.profile = function(){
    console.log($rootScope.seshUser)
    $location.path('/profile/' + $rootScope.seshUser._id);
  }

  $rootScope.afterLogin = function () {
    console.log('test')
    $location.path('/')
  }

  // This method is to get the user profile info from the facebook api
  $rootScope.getFacebookProfileInfo = function (authResponse, callback) {
    console.log(authResponse);

    openFB.api({
      path: '/me',
      params: {fields: 'id,name,email,verified,gender,friends'},
      success: function(data) {

        if(DEBUG.isEnabled){
            console.log('Facebook User:');
            console.log(data);
        }


        $rootScope.$apply(function() {

          if(callback)
            callback(data);

          console.log($rootScope.seshUser );
        });

        //document.getElementById("userPic").src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
      },
      error: errorHandler});


  };

  $rootScope.showLogOutMenu = function() {
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
              $rootScope.seshUser = null;
              $location.path('/sign-in');
            });

          }
        }
      }
    });
  };

  $rootScope.logOut = function() {
    $rootScope.showLogOutMenu();

  };

});

function errorHandler(error) {
  console.log(error.message);
}

app.directive('onErrorSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        console.log('sfdsfsd')
        if (attrs.src != attrs.onErrorSrc) {
          attrs.$set('src', attrs.onErrorSrc);
        }
      });
    }
  }
});

app.directive('myOnKeyUpCall', function () {

  return function (scope, element, attrs) {
    var numKeysPress=0;
    element.bind("keyup keypress", function (event) {
      numKeysPress++;
      if(numKeysPress>=3){
        scope.$apply(function (){
          scope.$eval(attrs.myOnKeyUpCall);
        });
        //event.preventDefault();
      }
    });
  };
});