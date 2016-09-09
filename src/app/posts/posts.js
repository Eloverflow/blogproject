'use strict';

angular.module('starter.controllers')

.controller('PostsCtrl', function($scope, getReq, delReq, $location, API_ENDPOINT) {


  $scope.deletePost = function (id) {

      var $url = API_ENDPOINT.url + '/post/' + id;

      var $callbackFunction = function (response) {
        $scope.posts.splice(id, 1);
      };

      if(confirm('Are you sure you want to delete this Post ?'))
      delReq.send($url, '/posts', $callbackFunction);

  };


  $scope.editPost = function (post_id) {
    $location.path('/post-edit/'+post_id)
  };
  
  $scope.getPosts = function () {

      var $url = API_ENDPOINT.url + '/post';

      var $callbackFunction = function (response) {
        $scope.posts = response;
      };

      getReq.send($url, null, $callbackFunction);
    };
  $scope.getPosts();
  

})