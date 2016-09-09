'use strict';

angular.module('starter.controllers')

.controller('PostsCtrl', function($scope, getReq, delReq, $location, $sce) {


  $scope.deletePost = function (id) {

      var $url = 'http://localhost/api/post/' + id;

      var $callbackFunction = function (response) {
        $scope.posts.splice(id, 1);
        console.log(response);
        //$location.path("#!/posts");
      };

      if(confirm('Are you sure you want to delete this Post ?'))
      delReq.send($url, null, $callbackFunction);

  };


    $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
    }

  $scope.editPost = function (post_id) {
    $location.path('/post-edit/'+post_id)
  };
  
  $scope.getPosts = function () {

      var $url = 'http://localhost/api/post';
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