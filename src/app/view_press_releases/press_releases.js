'use strict';

angular.module('starter.controllers')

.controller('PressReleasesCtrl', function($scope, getReq, delReq, $location, API_ENDPOINT, postReq) {


    $scope.deletePost = function (post) {

      var $url = API_ENDPOINT.url + '/press-release/' + post._id;

      var $callbackFunction = function (response) {
        $scope.posts.splice($scope.posts.indexOf(post), 1);
      };

      if(confirm('Are you sure you want to delete this Post ?'))
      delReq.send($url, null, $callbackFunction);

    };

    $scope.textSearch = {};

    $scope.editPost = function (post_id) {
        document.location.href  = '/dashboard.html#!/press-release-edit/'+post_id;
    };

    $scope.callRestService= function() {
        var $url = API_ENDPOINT.url + '/press-release/search';
        var $data = {search : $scope.textSearch.data};
        var $callbackfunction = function (response) {
            if(typeof $scope.result == 'undefined' || $scope.result == null)
                $scope.result = [];

            $scope.posts = response;
            $scope.noSearchResult = response == "";

        };

        console.log($data);
        postReq.send($url, $data, null, $callbackfunction)

    };

    $scope.getPosts = function () {

      var $url = API_ENDPOINT.url + '/press-release';

      var $callbackFunction = function (response) {

        $scope.posts = response;
        $scope.noSearchResult = false;

      };

      getReq.send($url, null, $callbackFunction);
    };
    $scope.getPosts();
  

})