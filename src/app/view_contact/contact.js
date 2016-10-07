'use strict';
angular.module('starter.controllers')
.controller('ContactCtrl', function($scope, vcRecaptchaService, postReq, DEBUG, API_ENDPOINT) {

  $scope.contact = {};
  $scope.response = null;
  $scope.widgetId = null;
  $scope.captcha = {
    key: '6LcEmwgUAAAAAPi_UtGJxyFmHUOVur8DcTs4AG2X'
  };
  $scope.setResponse = function (response) {
    if(DEBUG.isEnabled)
    console.info('Response available');

    $scope.response = response;
  };
  $scope.setWidgetId = function (widgetId) {
    if(DEBUG.isEnabled)
    console.info('Created widget ID: %s', widgetId);

    $scope.widgetId = widgetId;
  };
  $scope.cbExpiration = function() {
    if(DEBUG.isEnabled)
    console.info('Captcha expired. Resetting response object');

    vcRecaptchaService.reload($scope.widgetId);
    $scope.response = null;
  };
  
  $scope.submit = function () {

    $scope.errorList = [];
    var $url = API_ENDPOINT.url + '/contact';
    var $data = {contact: $scope.contact, captcha: $scope.response};

    var $callbackfunction = function (response) {

      if(response.success){
        $scope.contact = {};
        $scope.successMsg = response.msg;
      }
      else {
        console.log(response.msg)
        $scope.errorList.push(response.msg);


        // In case of a failed validation you need to reload the captcha
        // because each response can be checked just once
        vcRecaptchaService.reload($scope.widgetId);
      }

    };

    postReq.send($url, $data, null, $callbackfunction)

  };

})
