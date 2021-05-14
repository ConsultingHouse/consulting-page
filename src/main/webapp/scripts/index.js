(function () {
  var app = angular.module("app", []);
  app.controller("ItemController", [
    "$scope",
    "$http",
    function (scope, $http) {
      var c = this;
      c.htmlUrl = 'T';
      c.callPageGet = function () {
        $http
          .get(
            "https://consulting-page.herokuapp.com/connection",
            { Key: c.key },
            { method: "GET", headers: { "Content-Type": "application/json" } }
          )
          .then(
            function successCallback(response) {
              c.handleGET(response);
            },
            function errorCallback(response) {
              console.log(response);
            }
          );
      };
      c.handleGET = function (response) {
        c.htmlUrl = response.data.objectData.urlLogin.replace(
            "%3Fpageid=",
            encodeURIComponent(window.location.search)
          );
        document.getElementById("myIframe").src =
          response.data.objectData.urlLogin.replace(
            "%3Fpageid=",
            encodeURIComponent(window.location.search)
          );
      };
      c.init = function () {
        c.callPageGet();
      };
    },
  ]);
  app.config([
    "$qProvider",
    function ($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    },
  ]);
})();
