/*globals app */
'use strict';

app.controller('ContentController', ['$scope', function ($scope) {
    $scope.content = {
        title       : 'Mi Estupenda Aplicación',
        description : 'Hace que me sienta feliz de lo bien que funciona.',
        version     : '0.1.0'
    };

    $scope.alerts = [{
        type: 'success',
        msg: 'Wellcome to your first and amazing web application!'
    }];

    $scope.closeAlert = function (index) {
        $scope.alerts.splice(index, 1);
    };
}]);