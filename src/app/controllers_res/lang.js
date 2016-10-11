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

    $translateProvider.preferredLanguage('fr');
    $translateProvider.forceAsyncReload(true);
}]);