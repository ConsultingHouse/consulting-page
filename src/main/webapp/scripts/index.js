(function () {
var app = angular.module('app', []);

app.controller('ItemController', ['$scope', '$http', function (scope, $http) {
    var c = this;
    c.loading = true;
    c.allChecked = false;
    c.currentTable = '';

    c.objectData = null;

}]);
})();