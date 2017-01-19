'use strict';
// Declare app level module which depends on views, and components
var app  = angular.module('starter', ['starter.templates', 'starter.controllers','starter.services','starter.constants','ngRoute']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  //$locationProvider.hashPrefix('!');
  $locationProvider.html5Mode(true);

  // Main template mirageflow routes ---

  $routeProvider.when('/home', {
    templateUrl: 'templates/view_home/home.html',
    controller: 'HomeCtrl',
    title: 'Web development | Website | Consulting service',
    descFR: 'Mirageflow est une compagnie spécialisée en développement d\'application Web et Mobile. Peu importe l\'ampleur ou le type de développement nécessaire, nous serons à la hauteur!'
  });

  $routeProvider.when('/services', {
    templateUrl: 'templates/view_services/services.html',
    controller: 'PageServicesCtrl',
    title: 'Services',
    descFR: 'Nous offrons des services orientés Web et Mobile.'

  });

  $routeProvider.when('/portfolio', {
    templateUrl: 'templates/views_modern_template/portfolio.html',
    controller: 'PortfolioCtrl',
    title: 'Portfolio',
    descFR: 'Jetez un oeil à nos projets antérieurs ainsi qu\'à nos projets Open Source.'
  });

  $routeProvider.when('/blogproject', {
    templateUrl: 'templates/views_modern_template/portfolio-blogproject.html',
    controller: 'PortfolioCtrl',
    title: 'Portfolio | Blogproject',
    descFR: 'Un projet de blog open source utilisant des technologies qui vise la performance.'
  });

  $routeProvider.when('/portfolio/posio', {
    templateUrl: 'templates/views_modern_template/portfolio-posio.html',
    controller: 'PortfolioCtrl',
    title: 'Portfolio | POSIO',
    descFR: ''
  });

  $routeProvider.when('/about', {
    templateUrl: 'templates/views_modern_template/about.html',
    title: 'About',
    descFR: 'Chez Mirageflow une équipe impliquée et dynamique vous accompagnera dans vos projets.'
  });
  
  $routeProvider.when('/contact', {
    templateUrl: 'templates/view_contact/contact.html',
    controller: 'ContactCtrl',
    title: 'Contact',
    descFR: 'Prenez contacte avec nous, nous donnerons un suivi.'
  });

  // End main template ---

  $routeProvider.when('/profile/:id', {
    templateUrl: 'templates/view_profile/profile.html',
    controller: 'ProfileCtrl',
    title: 'Profile'
  });

  $routeProvider.when('/press-release/:id', {
    templateUrl: 'templates/view_press_release/press_release.html',
    controller: 'PressReleaseCtrl',
    title: 'Press-release'
  });
  $routeProvider.when('/press-releases', {
    templateUrl: 'templates/view_press_releases/press_releases.html',
    controller: 'PressReleasesCtrl',
    title: 'Press-releases'
  });
  $routeProvider.when('/terms-of-service', {
    templateUrl: 'templates/views_modern_template/terms-of-service.html',
    title: 'Terms-of-service'
  });

  $routeProvider.otherwise({redirectTo: '/home'});
}]);


app.run(function($rootScope,$http, API_ENDPOINT, AuthService, $sce, DEBUG, $location, Fullscreen, $translate, postReq, $timeout) {

  $rootScope.changeLanguage = function (langKey) {
    $translate.use(langKey);
    setTimeout(function () {
      localStorage.setItem("language", langKey);
      initMsgInteractive();
    }, 100)
  };

  $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {

    if (current.hasOwnProperty('$$route')) {

      $rootScope.pageTitle = 'Mirageflow | ' + current.$$route.title;
      $rootScope.pageDesc = current.$$route.descFR;
    }
  });

  $rootScope.goToPanel = function () {
    window.location = 'http://mirageflow.com/dashboard.html';
  };


  $rootScope.msgInteractive = [''];
  function initMsgInteractive() {
    $rootScope.msgInteractive = [''];
    $translate(['MSG-INTERATIVE-1', 'MSG-INTERATIVE-2']).then(function (translations) {


      $.each(translations, function(title, currentTranslation) {
        $rootScope.msgInteractive.push(currentTranslation);
      });

      $rootScope.msgInteractiveStart = Math.random();
    })

  }
  initMsgInteractive();


  openFB.init({appId: '1112318545481460'});

  $rootScope.getTitle = function () {
    var page = $location.path().substring(1);

    return page.charAt(0).toUpperCase() + page.slice(1);
  };

  $rootScope.getInfo = function () {
    $http.get(API_ENDPOINT.url + '/auth/memberinfo').then(function (result) {

      if(result.data.success) $rootScope.sesUser = result.data.user;

      if(DEBUG.isEnabled){
        console.log('User:');
        console.log(result);
      }
    },function (result, status) {
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

  $rootScope.getCurrentLanguage = function () {
    return $translate.use();
  };

  $rootScope.listenMenuButton = function () {
    $('.navbar-toggle').on('click', function () {
      document.body.addEventListener('click', bodyClickFn, true);
    })
  };
  $rootScope.listenMenuButton()

  function bodyClickFn() {
    closeMenu();
    removeBodyClickFn();
  }

  function removeBodyClickFn() {
    document.body.removeEventListener('click', bodyClickFn, true)
  }

  function closeMenu(  ){
    $('.navbar-toggle').click();
  };

  $rootScope.$on('$viewContentLoaded', function() {
    $('.img-responsive').on('click', function () {

        $rootScope.lastImage = $(this);
    });

  });

  var removeFullscreenHandler = Fullscreen.$on('FBFullscreen.change', function(evt, isFullscreenEnabled){
    if(!isFullscreenEnabled){
      $rootScope.$evalAsync(function(){
        $rootScope.lastImage.addClass('img-responsive');
        $rootScope.lastImage.off('click', fullscreenCancel)
      });
    }
    else {
      $rootScope.$evalAsync(function(){
        $rootScope.lastImage.removeClass('img-responsive');
        $rootScope.lastImage.on('click', fullscreenCancel)

      });
    }
  });

  function fullscreenCancel() {
    Fullscreen.cancel();
  }

  $rootScope.profile = function(){
    $location.path('/profile/' + $rootScope.sesUser._id);
  };

  $rootScope.afterLogin = function () {
    $location.path('/')
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


  $rootScope.callToActionSubmit = function () {

    $rootScope.callToActionErrorList = [];
    var $url = API_ENDPOINT.url + '/callToActionContact';
    var $data = {callToActionContact: $rootScope.callToActionContact};

    var $callbackfunction = function (response) {

      if(response.success){
        $rootScope.callToActionContact = '';
        $rootScope.callToActionSuccessObj = response;
        $timeout(function () {
          $('#callToActionModal').modal('hide');
        },1500);
      }
      else {
        console.log(response.msg);
        $rootScope.callToActionErrorList.push(response);
      }

    };

    postReq.send($url, $data, null, $callbackfunction)

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