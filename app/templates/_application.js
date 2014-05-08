/*globals angular */
/*jslint browser:true */

'use strict';

var app = angular.module('app', ['ngRoute', 'ui.bootstrap'], ['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {
        controller: 'ContentController',
        templateUrl: 'partials/content.html'
    }).otherwise({
        redirectTo: '/home'
    });

    $locationProvider.html5Mode(false);
}]);