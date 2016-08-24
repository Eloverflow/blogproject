'use strict';
angular.module('starter.controllers')
angular.module('starter.post', ['ngRoute', 'ui.tinymce'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/post', {
    templateUrl: 'post/post.html',
    controller: 'PostCtrl'
  });
  $routeProvider.when('/post/create', {
    templateUrl: 'post/create.html',
    controller: 'PostCreateCtrl'
  });
}])

.controller('PostCtrl', [function() {

}])

.controller('PostCreateCtrl', function($scope) {


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



    $rootScope.addCloth = function () {


        if($rootScope.currentCloth.image === 'undefined' || $rootScope.currentCloth.image === null ){
            console.log('No photo');
        }
        else{
            $rootScope.cloth.image = $rootScope.currentCloth.image;

            var $url = 'http://127.0.0.1/api/post/' + 'id';
            var  $data = $rootScope.cloth;/*
             $callbackPath = '/cloth/type/' + $stateParams.type;*/

            var $callbackFunction = function (response) {
                //$location.path("/");
                $rootScope.getCloths();
                $rootScope.updateDressroom();
            }

            //postReq.send($url, $data, null, $callbackFunction);
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
    'onChange': test
  });

  function test() {
    var test = $(this).tagsInput();
    console.log(test.val())
  }


});