'use strict';

angular.module('starter.controllers')
.controller('ProfileCtrl', function($scope, AuthService, $location, $routeParams, API_ENDPOINT, getReq) {
  $scope.settings = {
    enableFriends: true
  };

  $scope.getUser = function() {
    var $url = API_ENDPOINT.url + '/auth/'+ $routeParams.id +'/profile';

    var $callbackFunction = function (response) {
      $scope.user = response;
    };

    getReq.send($url, null, $callbackFunction);
  };
  $scope.getUser();

  $scope.getPosts = function() {
    var $url = API_ENDPOINT.url + '/auth/'+ $routeParams.id +'/posts';

    var $callbackFunction = function (response) {
      $scope.posts = response;
    };

    getReq.send($url, null, $callbackFunction);
  };
  $scope.getPosts();


  $scope.newPwd = function() {
    bootbox.dialog({
      title: "Type your new password !",
      message: '<div class="row">  ' +
      '<div class="col-md-12"> ' +
      '<div class="form-group"> ' +
      '<form class="bootbox-form">'+
      '<input id="new-password" class="bootbox-input bootbox-input-text form-control" autocomplete="off" type="password">'+
      '</form>'+
      '</div>'+
      '</div>',
      buttons: {
        success: {
          label: "Save",
          className: "btn-success",
          callback: function () {
            var result = $('#new-password').val();
            if (result === null) {
              // "Prompt dismissed"
            } else {
              $scope.msgList = [];
              $scope.errorList = [];              
              AuthService.changePwd({password: result}).then(function(result) {
                if (result.success){
                  $scope.msgList.push(result.msg);
                }
              }, function(errMsg) {
                if (!errMsg.success)
                  $scope.errorList.push(errMsg.msg);
              });
            }
          }
        }
      }
    });
  };

});
