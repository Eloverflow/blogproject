'use strict';

angular.module('starter.posts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/posts', {
    templateUrl: 'posts/posts.html',
    controller: 'PostsCtrl'
  });
}])

    
.controller('PostsCtrl', function($scope, getReq, delReq, $location) {


  $scope.deletePost = function (id) {

    if($scope.post === 'undefined' ){
      console.log('Post is empty');
    }
    else {
      var $url = 'http://127.0.0.1/api/post/' + id;
      var $data = $scope.post;
      /*
       $callbackPath = '/cloth/type/' + $stateParams.type;*/

      var $callbackFunction = function (response) {
        //$location.path("/");
        //$rootScope.updatePostList();
        console.log('posts')
        console.log(response)
        $location.path("#!/posts");
      }

      if(confirm('Are you sure you want to delete this Post ?'))
      delReq.send($url, $data, null, $callbackFunction);
    }
  }
  
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