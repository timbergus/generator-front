/*globals angular */
/*jslint browser:true */

'use strict';

var app = angular.module('app', ['ngRoute', 'pascalprecht.translate', 'ui.bootstrap', 'ui.calendar'], ['$routeProvider', '$translateProvider', '$locationProvider', function ($routeProvider, $translateProvider, $locationProvider) {
    $routeProvider.when('/home', {
        controller: 'ContentController',
        templateUrl: 'partials/content.html'
    }).otherwise({
        redirectTo: '/home'
    });

    /**
     * This function gets the browser language.
     * @method getLocale
     * @return {string} The browser language in a two letters string.
     */

    var getLocale = function () {
        var nav = window.navigator;
        return (nav.language || nav.browserLanguage || nav.systemLanguage || nav.userLanguage || '').split('-')[0];
    };

    // $translateProvider is configured to read the corresponding JSON file for the language selected by the user and two options are set:
    // 
    // * fallbackLanguage: the language that is going to loaded if no other language is specified.
    // * preferredLanguage: the language that is going to be loaded.

    $translateProvider.useStaticFilesLoader({
        prefix: './translations/',
        suffix: '.json'
    })
        .fallbackLanguage(getLocale())
        .preferredLanguage(getLocale());

    $locationProvider.html5Mode(false);
}]);