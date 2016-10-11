'use strict';
angular.module('starter.controllers')
.config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useSanitizeValueStrategy(null);
    /*$translateProvider.usePostCompiling(true);*/

    // configures staticFilesLoader
    $translateProvider.useStaticFilesLoader({
        prefix: '/controllers_res/lang-',
        suffix: '.json',
        $http: { cache: true }
});

    var lang = window.navigator.language || window.navigator.userLanguage;
    if (lang === 'fr-FR') {
        $translateProvider.preferredLanguage('FR');
    }
    else {
        $translateProvider.preferredLanguage('EN');
    }

    $translateProvider.forceAsyncReload(true);
}]);