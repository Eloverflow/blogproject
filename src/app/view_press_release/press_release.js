'use strict';

angular.module('starter.controllers')
.controller('PressReleaseCtrl', function($rootScope, $scope, getReq, $routeParams, $sce, postReq, $http, AuthService, API_ENDPOINT,$filter,$location, delReq) {

    $scope.getPost = function () {

        var $url = API_ENDPOINT.url + '/press-release/' + $routeParams.id;

        var $callbackFunction = function (response) {
            $scope.post = response;
        };

        getReq.send($url, null, $callbackFunction);
    };
    $scope.getPost();

    $scope.editPost = function (post_id) {
        document.location.href = '/dashboard.html#!/press-release-edit/'+post_id;
    };


    $scope.deletePost = function () {

        if($scope.post === 'undefined' ){
            console.log('Post is empty');
        }
        else {
            var $url = API_ENDPOINT.url + '/press-release/' + $routeParams.id;

            if(confirm('Are you sure you want to delete this Post ?'))
                delReq.send($url, '/posts');
        }
    }
})

.controller('PressReleaseCreateCtrl', function($rootScope, $location, $scope, getReq, $routeParams, postReq, $http, API_ENDPOINT, $parse) {

    $scope.getGoogleTranslate = function (dst) {

        var $callbackFunction = function (response) {

            if(response){
                $scope.googleTranslateResult = response.data.translations[0]['translatedText'];
            }
        };

        var text;
        var $url;
        var key = '22a8e7e7460a09d862183886a2bb25dc6e2edaf7';

        if(dst){
            if(dst == 'fr')
                text = $scope.post.contentEN;
            else if(dst == 'en')
                text = $scope.post.contentFR;

            $url = 'https://www.googleapis.com/language/translate/v2/detect?key=' + key + '&q=' + encodeURI(text) + '&source=auto&target='+dst

            getReq.send($url, null, $callbackFunction);

        }



    }

    $scope.previewPost = {
        content: ""
    };


    $scope.makePreviewPost = function () {
        $scope.previewPost = $scope.post;
    };


    
    $scope.addPost = function () {

        $scope.errorList = [];

        var $url = API_ENDPOINT.url + '/press-release';

        var $callbackFunction = function (response) {

            if(response.success) $location.path('/press-releases');

        };

        var fieldState = {title: 'VALID', content: 'VALID'};

        if($scope.createPostForm.title.$error.required || !$scope.createPostForm.title){
            fieldState.title = 'The title is required.';
        }

        if($scope.createPostForm.content.$error.required || !$scope.createPostForm.content){
            fieldState.content = 'The content is required.';
        }

        for (var fieldName in fieldState) {
            var message = fieldState[fieldName];
            var serverMessage = $parse('createPostForm.'+fieldName+'.$error.serverMessage');

            if (message == 'VALID') {
                $scope.createPostForm.$setValidity(fieldName, true, $scope.createPostForm);
                serverMessage.assign($scope, undefined);
            }
            else {

                $scope.createPostForm.$setValidity(fieldName, false, $scope.createPostForm);
                serverMessage.assign($scope, fieldState[fieldName]);

                $scope.errorList.push(fieldState[fieldName]);
            }
        }

        console.log($scope.errorList);

        if ($scope.errorList.length == 0) {
            postReq.send($url, $scope.post, null, $callbackFunction)
            console.log("Valid form !!!");
        } else {
            console.log("Invalid form !!!");
        }


    };

    $scope.getContent = function() {
      console.log('Editor content:', $scope.tinymceModel);
        return $scope.tinymceModel;
    };

    $scope.setContent = function() {
      $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.tinymceOptions = {
        height: 200,
        setup: function(editor) {
            editor.on("init", function () {
                $(editor.editorContainer).addClass('form-control');
            });
        },
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
.controller('PressReleaseEditCtrl', function($scope, putReq, getReq, delReq, $routeParams, $location, API_ENDPOINT, $parse) {

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
        setup: function(editor) {
            editor.on("init", function () {
                $(editor.editorContainer).addClass('form-control');
            });
        },
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

        var $url = API_ENDPOINT.url + '/press-release/' + $routeParams.id;

        var $callbackFunction = function (response) {

            $scope.post = {};

            $.each(response, function (key, value) {
                if(key == 'content_fr')
                    key = 'contentFR';
                if(key == 'content_en')
                    key = 'contentEN';
                $scope.post[key] = value
            });

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
            var $url = API_ENDPOINT.url + '/press-release/' + $routeParams.id;

            if(confirm('Are you sure you want to delete this Post ?'))
            delReq.send($url, '/press-releases');
        }
    };

    $scope.updatePost = function () {

        $scope.errorList = [];

        var $url = API_ENDPOINT.url + '/press-release/' + $routeParams.id;

        var $callbackFunction = function (response) {

            if(response.success) $location.path('/press-releases');

        };

        var fieldState = {title: 'VALID', content: 'VALID'};

        if($scope.editPostForm.title.$error.required || !$scope.editPostForm.title){
            fieldState.title = 'The title is required.';
        }

        if($scope.editPostForm.content.$error.required || !$scope.editPostForm.content){
            fieldState.content = 'The content is required.';
        }

        for (var fieldName in fieldState) {
            var message = fieldState[fieldName];
            var serverMessage = $parse('createPostForm.'+fieldName+'.$error.serverMessage');

            if (message == 'VALID') {
                $scope.editPostForm.$setValidity(fieldName, true, $scope.editPostForm);
                serverMessage.assign($scope, undefined);
            }
            else {

                $scope.editPostForm.$setValidity(fieldName, false, $scope.editPostForm);
                serverMessage.assign($scope, fieldState[fieldName]);

                $scope.errorList.push(fieldState[fieldName]);
            }
        }

        console.log($scope.errorList);

        if ($scope.errorList.length == 0) {
            putReq.send($url, $scope.post, null, $callbackFunction)
            console.log("Valid form !!!");
        } else {
            console.log("Invalid form !!!");
        }



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

