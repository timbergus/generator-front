/*globals app */

app.controller('ContentController', ['$scope', function ($scope) {
    $scope.content = {
        title       : '<%= appName %>',
        description : '<%= appDescription %>',
        versino     : '<%= appVersion %>'
    };
}]);