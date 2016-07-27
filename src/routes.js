module.exports = routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/feed');

  $stateProvider
    .state('app', {
      url: '/',
      template: '<app>test1</app>'
    });
  $stateProvider
    .state('article', {
      url: '/article',
      template: '<app>test1</app>'
    });
  $stateProvider
    .state('feed', {
      url: '/feed',
      template: '<app>test1</app>'
    });
}
