'use strict';
angular.module('starter.controllers', ['ui.tinymce'])
.controller('PostCtrl', function($rootScope, $scope, getReq, $routeParams, $sce, postReq, $http, AuthService, API_ENDPOINT,$filter,$location, delReq) {

    $scope.getPost = function () {

        var $url = API_ENDPOINT.url + '/post/' + $routeParams.id;

        var $callbackFunction = function (response) {
            $scope.post = response;
        };

        getReq.send($url, null, $callbackFunction);
    };
    $scope.getPost();

    $scope.getComments = function () {

        var $url = API_ENDPOINT.url + '/post/' + $routeParams.id  + '/comments';

        var $callbackFunction = function (response) {
            for(var i = 0; i < response.length; i++){
                response[i].myVote  = $filter('filter')(response[i].votes, {user_id: $rootScope.user._id})[0];
            }
            $scope.comments = response;
            console.log($scope.comments);
        };

        getReq.send($url, null, $callbackFunction);
    };
    $scope.getComments();

    
    $scope.addUpVote = function (comment) {
        if(typeof comment.myVote == 'undefined'){
            addVote(comment, true);
            comment.MyVote = { is_upvote :true }
        } else {
            if(!comment.myVote.is_upvote){
                comment.votes.splice(comment.votes.indexOf(comment.myVote), 1);
                addVote(comment, true);
            }
        }
    };
    $scope.addDownVote = function (comment) {
        if(typeof comment.myVote == 'undefined'){
            addVote(comment, false);
        } else {
            if(comment.myVote.is_upvote){
                comment.votes.splice(comment.votes.indexOf(comment.myVote), 1);
                addVote(comment, false);
            }
        }
    };
    
    function addVote(comment, isUpVote) {
        var $url = API_ENDPOINT.url + '/vote';
        var data = {comment_id: comment._id, is_upvote: isUpVote};

        var $callbackFunction = function (response) {

            if(typeof comment.votes == 'undefined' || comment.votes == null)
                comment.votes = [];


            comment.votes.push(response);
            comment.myVote = response;
        };

         postReq.send($url, data, null, $callbackFunction);
    }

    $scope.comment = {post_id : $routeParams.id};

    $scope.addSubComment = function (comment) {

        var $url = API_ENDPOINT.url + '/subComment';
        var data = {comment_id: comment._id, content: comment.currentSubComment};

        var $callbackFunction = function (response) {

            if(typeof $scope.comments == 'undefined' || $scope.comments == null)
                $scope.comments = [];

            if(typeof comment.sub_comments == 'undefined' || comment.sub_comments == null)
                comment.sub_comments = [];
            
            comment.sub_comments.push(response);
            comment.currentSubComment = "";
        };
         postReq.send($url, data, null, $callbackFunction);
    };

    $scope.addComment = function (comment) {

        var $url = API_ENDPOINT.url + '/comment';
        var data = comment;

        var $callbackFunction = function (response) {
            if(typeof $scope.comments == undefined || $scope.comments == null)
            $scope.comments = [];

            $scope.comments.push(response);
        };

         postReq.send($url, data, null, $callbackFunction);

    };


    $scope.editPost = function (post_id) {
        $location.path('/post-edit/'+post_id)
    };


    $scope.deletePost = function () {

        if($scope.post === 'undefined' ){
            console.log('Post is empty');
        }
        else {
            var $url = API_ENDPOINT.url + '/post/' + $routeParams.id;

            if(confirm('Are you sure you want to delete this Post ?'))
                delReq.send($url, '/posts');
        }
    }
})

.controller('PostCreateCtrl', function($rootScope, $location, $scope, getReq, $routeParams, postReq, $http, API_ENDPOINT) {

    $scope.previewPost = {
        content: ""
    };


    $scope.makePreviewPost = function () {
        $scope.previewPost = $scope.post;
    };

    $scope.addPost = function (post) {

        if($scope.post === 'undefined' ){
         console.log('Post is empty');
         }
         else {
            var $url = API_ENDPOINT.url + '/post';
            postReq.send($url, post, '/posts')
        }
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
        }
    }


})
.controller('PostEditCtrl', function($scope, putReq, getReq, delReq, $routeParams, $location, API_ENDPOINT) {

    $scope.previewPost = {
        content: ""
    };

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

        var $url = API_ENDPOINT.url + '/post/' + $routeParams.id;

        var $callbackFunction = function (response) {
            $scope.post = response;
            tags.importTags(response.tags.join());
        };

        getReq.send($url, null, $callbackFunction);
    };
    $scope.getPost();

    $scope.deletePost = function () {

        if($scope.post === 'undefined' ){
            console.log('Post is empty');
        }
        else {
            var $url = API_ENDPOINT.url + '/post/' + $routeParams.id;

            if(confirm('Are you sure you want to delete this Post ?'))
            delReq.send($url, '/posts');
        }
    }

    $scope.updatePost = function () {

        if($scope.post === 'undefined' ){
            console.log('Post is empty');
        }
        else {
            var $url = API_ENDPOINT.url + '/post/' + $routeParams.id;
            var $data = $scope.post;

            var $callbackFunction = function (response) {
                $location.path("/posts");
            }

            putReq.send($url, $data, null, $callbackFunction);
        }
    }


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
        }
    }

})

