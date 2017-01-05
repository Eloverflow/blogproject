'use strict';
angular.module('starter.controllers')
.controller('HomeCtrl', function($scope, $rootScope, DEBUG, API_ENDPOINT, $translate) {


    if(DEBUG.isEnabled){
        if(!$rootScope.callToActionModalProc){
            setTimeout(function () {
                $('#callToActionModal').modal('show');
                $rootScope.callToActionModalProc = true;
            },1000)
        }
    }

});



