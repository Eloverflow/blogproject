'use strict';
angular.module('starter.controllers')
.controller('HomeCtrl', function($scope, DEBUG, API_ENDPOINT, $translate) {

    $scope.msgInteractive = [''];

    $translate(['MSG-INTERATIVE-1', 'MSG-INTERATIVE-2']).then(function (translations) {


        $.each(translations, function(title, currentTranslation) {
            $scope.msgInteractive.push(currentTranslation);
        });

        console.log($scope.msgInteractive)

    })

});



