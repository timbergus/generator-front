'use strict';

describe('ContentController from app', function() {
    var scope;
    beforeEach(angular.mock.module('app'));
    beforeEach(angular.mock.inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        $controller('ContentController', {
            $scope: scope
        });
    }));

    // VARIABLES

    it('should have a variable called "content"', function() {
        expect(scope.content).toBeDefined();
    });
});