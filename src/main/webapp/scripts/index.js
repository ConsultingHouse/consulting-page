(function () {
var app = angular.module('app', []);

app.controller('ItemController', ['$scope', '$http', function (scope, $http) {
    var c = this;

    c.callPageGet = function () {
        var req = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        $http.get('https://consulting-page.herokuapp.com/connection', body, req).then(
            function successCallback(response) { 
                debugger;
                c.handleGET(response);
            }, 
            function errorCallback(response) { 
                console.log(response); 
            }
        );
    };
    c.handleGET = function (response) {
        document.getElementById('myIframe').src = response.data.objectData.urlLogin.replace('pageid=', 'pageid='+window.location.search.split('?pageId=')[1]);

    };
    c.init = function () {
        c.callPageGet();
    };
}]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
})();