'use strict';

angular.module('myApp.post', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
}])

.controller('PostCtrl', [function() {

}]);