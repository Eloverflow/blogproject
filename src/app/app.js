'use strict';
// Declare app level module which depends on views, and components
var app  = angular.module('starter', ['starter.controllers','starter.services','ngRoute','starter.post', 'starter.posts']);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/posts'});
}])


