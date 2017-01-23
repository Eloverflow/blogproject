'use strict';
angular.module('starter.controllers')
.controller('HomeCtrl', function($scope, $rootScope, DEBUG, API_ENDPOINT, $translate) {
    
    if(!$rootScope.callToActionModalProc){
        setTimeout(function () {
            $('#callToActionModal').modal('show');
            $rootScope.callToActionModalProc = true;
           

            $('#callToActionModal').on('hidden.bs.modal', function (e) {
                localStorage.setItem('callToActionModalDismissed', JSON.stringify({date: new Date(), flag:true}));
            })
        },5000)
    }

});



