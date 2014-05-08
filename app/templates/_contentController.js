/*globals app */

app.controller('ContentController', ['$scope', function ($scope) {
    $scope.content = {
        title       : '<%= appName %>',
        description : '<%= appDescription %>',
        versino     : '<%= appVersion %>'
    };

    $scope.alerts = [
    	{ type: 'success', msg: 'Wellcome to your first and amazing web application!' }
  	];

  	$scope.closeAlert = function(index) {
    	$scope.alerts.splice(index, 1);
  	};
}]);