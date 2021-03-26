(function () {
var app = angular.module('app', []);

app.controller('ItemController', ['$scope', '$http', function (scope, $http) {
    var c = this;
    c.key = '';
    c.url = '';

    c.callPageGet = function () {
        var req = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
        var body = {
            'Key': c.key
        };
        $http.get('https://consulting-page.herokuapp.com/connection', body, req).then(
            function successCallback(response) { 
                c.handleGET(response);
            }, 
            function errorCallback(response) { 
                console.log(response); 
            }
        );
    };
    c.handleGET = function (response) {
        c.url = response.data.objectData.urlLogin;
        //a0a0a00000TFzHVAA1
        document.getElementById('myIframe').src = c.url.replace('pageid=', 'pageid='+window.location.search.split('?pageId=')[1]);

    };
    c.init = function () {
        c.callPageGet();
    };
}]);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
})();