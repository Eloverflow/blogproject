'use strict';

angular.module('starter.posts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/posts', {
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  });
}])

    
.controller('PostsCtrl', function($scope, getReq, $rootScope) {

  $scope.getPosts = function () {

      var $url = 'http://127.0.0.1/api/post';
    /*
       $callbackPath = '/cloth/type/' + $stateParams.type;*/

      var $callbackFunction = function (response) {
        //$location.path("/");
        //$rootScope.updatePostList();
        console.log(response);
        $scope.posts = response;
      };

      getReq.send($url, null, $callbackFunction);
    };
  $scope.getPosts();


  $scope.goToPost = function (id) {
        $rootScope.post = {
          id: id
        }
  }

  })


    .factory('postReq', function ($http, $location) {

      return {
        send: function($url, $data, $callbackPath, $callbackFunction) {
          $http({
            url: $url,
            method: "POST",
            data: $data
          }).success(function (data) {/*
           console.log(data);*/

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

    .factory('putReq', function ($http, $location) {

      return {
        send: function($url, $data, $callbackPath, $callbackFunction) {
          $http({
            url: $url,
            method: "PUT",
            data: $data
          }).success(function (data) {/*
           console.log(data);*/

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
          }).success(function (response) {/*
           console.log(response);*/

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
          }).success(function (response) {/*
           console.log(response);*/

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