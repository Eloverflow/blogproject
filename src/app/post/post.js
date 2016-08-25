'use strict';
angular.module('starter.post', ['ngRoute', 'ui.tinymce'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post/:id', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post-create', {
    templateUrl: 'post/create.html',
    controller: 'PostCreateCtrl'
  });
}])

.controller('PostCtrl', function($rootScope, $scope, getReq, $routeParams, $sce) {


    $scope.getPost = function () {

        var $url = 'http://127.0.0.1/api/post/' + $routeParams.id;
        /*
         $callbackPath = '/cloth/type/' + $stateParams.type;*/

        var $callbackFunction = function (response) {
            //$location.path("/");
            //$rootScope.updatePostList();
            console.log(response);
            $scope.post = response;
        };

        getReq.send($url, null, $callbackFunction);
    };
    $scope.getPost();

    $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
    }

})

.controller('PostCreateCtrl', function($scope, postReq, $sce) {

    $scope.previewPost = {
        content: ""
    };

    $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
    }

    $scope.makePreviewPost = function () {
        $scope.previewPost = $scope.post;
    };

    $scope.tinymceModel = '';

    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.tinymceOptions = {
        height: 400,
        plugins: ['advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
        ],
        toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        skin: 'lightgray',
        theme : 'modern'
    };



    $scope.addPost = function () {

        if($scope.post === 'undefined' ){
            console.log('Post is empty');
        }
        else {
            var $url = 'http://127.0.0.1/api/post';
            var $data = $scope.post;
        /*
             $callbackPath = '/cloth/type/' + $stateParams.type;*/

            var $callbackFunction = function (response) {
                //$location.path("/");
                //$rootScope.updatePostList();
                console.log('posts')
                console.log(response)
            }

            postReq.send($url, $data, null, $callbackFunction);
        }
    }


    /*tinymce.init({
      selector: '#post-content',
      height: 500,
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table contextmenu paste code'
      ],
      toolbar: 'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
      content_css: [
        '//www.tinymce.com/css/codepen.min.css'
      ],
      theme_advanced_path : false
    });*/



  /* https://github.com/xoxco/jQuery-Tags-Input */
  $('#post-tags').tagsInput({
    'width':'100%',
    'height':'44px',
    'onChange': updateTags
  });

  function updateTags() {
    var str_array = $(this).tagsInput();
      if(typeof $scope.post != 'undefined' && $scope.post != null)
      {
          $scope.post.tags = (str_array.val()).split(',');


         /* for(var i = 0; i < str_array.length; i++) {
              // Trim the excess whitespace.
              str_array[i] = str_array[i].replace(/^\s*!/, "").replace(/\s*$/, "");
              // Add additional code here, such as:
              $scope.post.tags.push(str_array[i]);
          }
*/
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