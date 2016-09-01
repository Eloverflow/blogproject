'use strict';
angular.module('starter.controllers', ['ui.tinymce'])
.controller('PostCtrl', function($rootScope, $scope, getReq, $routeParams, $sce, postReq, $http, AuthService) {

    console.log(" Is authenticated : " + AuthService.isAuthenticated());

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
    $scope.getComments = function () {

        var $url = 'http://127.0.0.1/api/post/' + $routeParams.id  + '/comments';
        /*
         $callbackPath = '/cloth/type/' + $stateParams.type;*/

        var $callbackFunction = function (response) {
            //$location.path("/");
            //$rootScope.updatePostList();
            console.log(response);
            $scope.comments = response;
        };

        getReq.send($url, null, $callbackFunction);
    };
    $scope.getComments();

    
    $scope.addUpVote = function (comment) {
        addVote(comment, true);
    };
    $scope.addDownVote = function (comment) {
       addVote(comment, false);
    };
    
    function addVote(comment, isUpVote) {
        var $url = 'http://127.0.0.1/api/vote';
        var data = {comment_id: comment._id, is_upvote: isUpVote};
        /*
         $callbackPath = '/cloth/type/' + $stateParams.type;*/

        var $callbackFunction = function (response) {
            console.log(response);

            if(typeof comment.votes == 'undefined' || comment.votes == null)
                comment.votes = [];

            comment.votes.push(response);
            console.log(comment);
        };
        /*
         postReq.send($url, data, null, $callbackFunction);*/

        $http({
            url: $url,
            method: "POST",
            data: data
        }).success(function (data, status, headers, config) {/*
         console.log(data);*/
            if($callbackFunction)
                $callbackFunction(data);
        })
    }

    $scope.comment = {post_id : $routeParams.id};

    $scope.addSubComment = function (comment) {

        var $url = 'http://127.0.0.1/api/subComment';
        var data = {comment_id: comment._id, content: comment.currentSubComment};
        /*
         $callbackPath = '/cloth/type/' + $stateParams.type;*/

        var $callbackFunction = function (response) {
            //$location.path("/");
            //$rootScope.updatePostList();
            console.log(response);

            if(typeof $scope.comments == 'undefined' || $scope.comments == null)
                $scope.comments = [];

            if(typeof comment.sub_comments == 'undefined' || comment.sub_comments == null)
                comment.sub_comments = [];
            
            comment.sub_comments.push(response);
            comment.currentSubComment = "";
            console.log(comment);
        };
        /*
         postReq.send($url, data, null, $callbackFunction);*/

        $http({
            url: $url,
            method: "POST",
            data: data
        }).success(function (data, status, headers, config) {/*
         console.log(data);*/
            if($callbackFunction)
                $callbackFunction(data);
        })
    }
    $scope.addComment = function (comment, url) {

        var $url = 'http://127.0.0.1/api/comment';
        var data = comment;
        /*
         $callbackPath = '/cloth/type/' + $stateParams.type;*/

        var $callbackFunction = function (response) {
            //$location.path("/");
            //$rootScope.updatePostList();
            console.log(response);

            if(typeof $scope.comments == undefined || $scope.comments == null)
            $scope.comments = [];

            $scope.comments.push(response);
            console.log($scope.comments);
        };
/*
         postReq.send($url, data, null, $callbackFunction);*/

        $http({
            url: $url,
            method: "POST",
            data: data
        }).success(function (data, status, headers, config) {/*
         console.log(data);*/
            if($callbackFunction)
                $callbackFunction(data);
        })
    };


})

.controller('PostCreateCtrl', function($scope, postReq, $sce, $location) {

    $scope.previewPost = {
        content: ""
    };

    $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
    }

    $scope.makePreviewPost = function () {
        $scope.previewPost = $scope.post;
    };


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
                $location.path('#/posts');
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
.controller('PostEditCtrl', function($scope, putReq, getReq, delReq, $sce, $routeParams, $location) {

    $scope.previewPost = {
        content: ""
    };

    $scope.toTrustedHTML = function( html ){
        return $sce.trustAsHtml( html );
    }

    $scope.makePreviewPost = function () {
        $scope.previewPost = $scope.post;
    };


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

    var tags = $('#post-tags');
    $scope.getPost = function () {

        var $url = 'http://127.0.0.1/api/post/' + $routeParams.id;
        /*
         $callbackPath = '/cloth/type/' + $stateParams.type;*/

        var $callbackFunction = function (response) {
            //$location.path("/");
            //$rootScope.updatePostList();
            console.log(response);
            $scope.post = response;
            tags.importTags(response.tags.join());
            console.log(response.tags)


            /*$scope.post.tags = response.tags*/
        }

        getReq.send($url, null, $callbackFunction);
    };
    $scope.getPost();

    $scope.deletePost = function () {

        if($scope.post === 'undefined' ){
            console.log('Post is empty');
        }
        else {
            var $url = 'http://127.0.0.1/api/post/' + $routeParams.id;
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

    $scope.updatePost = function () {

        if($scope.post === 'undefined' ){
            console.log('Post is empty');
        }
        else {
            var $url = 'http://127.0.0.1/api/post/' + $routeParams.id;
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

            putReq.send($url, $data, null, $callbackFunction);
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
                }).success(function (data, status, headers, config) {/*
                 console.log(data);*/

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction(data);

                })
                    .error(function (data, status, headers, config) {
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
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: $data
                }).success(function (data) {/*
                 console.log(data);*/

                    if($callbackPath)
                        $location.path($callbackPath);

                    if($callbackFunction)
                        $callbackFunction(data);

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