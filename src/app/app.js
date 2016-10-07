'use strict';
// Declare app level module which depends on views, and components
var app  = angular.module('starter', ['starter.controllers','starter.services','starter.constants','ngRoute']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');

  $routeProvider.when('/contact', {
    templateUrl: 'view_contact/contact.html',
    controller: 'ContactCtrl'
  });

  $routeProvider.when('/sign-in', {
    templateUrl: 'view_user/sign_in.html',
    controller: 'UserCtrl'
  });

  $routeProvider.when('/sign-up', {
    templateUrl: 'view_user/sign_up.html',
    controller: 'UserCtrl'
  });

  $routeProvider.when('/new-user', {
    templateUrl: 'view_user/create-new.html',
    controller: 'UserCtrl'
  });

  $routeProvider.when('/edit-user/:id', {
    templateUrl: 'view_user/edit.html',
    controller: 'UserCtrl'
  });

  $routeProvider.when('/forgot-password', {
    templateUrl: 'view_user/forgot_pass.html',
    controller: 'UserCtrl'
  });

  $routeProvider.when('/new-password/:token', {
    templateUrl: 'view_user/new_pass.html',
    controller: 'UserCtrl'
  });

  $routeProvider.when('/user-list', {
    templateUrl: 'view_user/list.html',
    controller: 'UserListCtrl'
  });

  $routeProvider.when('/profile/:id', {
    templateUrl: 'view_profile/profile.html',
    controller: 'ProfileCtrl'
  });

  $routeProvider.when('/home', {
    templateUrl: 'views_modern_template/home.html'
  });

  $routeProvider.when('/services', {
    templateUrl: 'view_services/services.html',
    controller: 'PageServicesCtrl'
  });

  $routeProvider.when('/portfolio', {
    templateUrl: 'views_modern_template/portfolio.html'
  });
  $routeProvider.when('/portfolio/posio', {
    templateUrl: 'views_modern_template/portfolio-posio.html'
  });

  $routeProvider.when('/about', {
    templateUrl: 'views_modern_template/about.html'
  });


  $routeProvider.when('/post/:id', {
    templateUrl: 'view_post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post-create', {
    templateUrl: 'view_post/create.html',
    controller: 'PostCreateCtrl'
  });
  $routeProvider.when('/post-edit/:id', {
    templateUrl: 'view_post/edit.html',
    controller: 'PostEditCtrl'
  });
  $routeProvider.when('/posts', {
    templateUrl: 'view_posts/posts.html',
    controller: 'PostsCtrl'
  });


  $routeProvider.when('/press-release/:id', {
    templateUrl: 'view_press_release/press_release.html',
    controller: 'PressReleaseCtrl'
  });
  $routeProvider.when('/press-release-create', {
    templateUrl: 'view_press_release/create.html',
    controller: 'PressReleaseCreateCtrl'
  });
  $routeProvider.when('/press-release-edit/:id', {
    templateUrl: 'view_press_release/edit.html',
    controller: 'PressReleaseEditCtrl'
  });
  $routeProvider.when('/press-releases', {
    templateUrl: 'view_press_releases/press_releases.html',
    controller: 'PressReleasesCtrl'
  });

  $routeProvider.otherwise({redirectTo: '/home'});
}]);


app.run(function($rootScope,$http, API_ENDPOINT, AuthService, $sce, DEBUG, $location) {

  openFB.init({appId: '1112318545481460'});


  $rootScope.getInfo = function () {
    $http.get(API_ENDPOINT.url + '/auth/memberinfo').success(function (result) {

      if(result.success) $rootScope.sesUser = result.user;

      if(DEBUG.isEnabled){
        console.log('User:');
        console.log(result);
      }
    }).error(function (result, status) {
      if(status == 403){
        if(DEBUG.isEnabled) {
          console.log('Emptying the token and redirecting to login')
        }
        AuthService.logout();
        $location.path('/sign-in');
      }
    });

  };


  AuthService.startupAuthenticate();

  if(AuthService.isAuthenticated()){
    if(DEBUG.isEnabled)
      console.log('Doing profile information retrieval');

    $rootScope.getInfo();
  }
  
  $rootScope.toTrustedHTML = function( html ){
    return $sce.trustAsHtml( html );
  };

  $rootScope.profile = function(){
    $location.path('/profile/' + $rootScope.sesUser._id);
  };

  $rootScope.afterLogin = function () {
    $location.path('/')
  };

  // This method is to get the user profile info from the facebook api
  $rootScope.getFacebookProfileInfo = function (authResponse, callback) {

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
          
        });
        
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

            AuthService.logout();

            $rootScope.$apply(function() {
              $rootScope.sesUser = null;
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

  $rootScope.isActive = function (viewLocation) {
    var path;
    var splitted = $location.path().split("/");
    if(splitted.length > 2){
      path = '/'+splitted[1];
    }
    else {
      path = $location.path();
    }

    return viewLocation === path;
  };

});

function errorHandler(error) {
  console.log(error.message);
}

app.directive('onErrorSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.onErrorSrc) {
          attrs.$set('src', attrs.onErrorSrc);
        }
      });
    }
  }
});

app.directive('myOnKeyUpCall', function () {
  return function (scope, element, attrs) {
    element.bind("keyup", function (event) {
      if(element.val().length >= 3){
        scope.$apply(function (){
          scope.$eval(attrs.myOnKeyUpCall);
        });
        //event.preventDefault();
      }
      else if (element.val().length == 0){
        scope.$apply(function (){
          scope.getPosts();
        });
      }
    });
  };
});