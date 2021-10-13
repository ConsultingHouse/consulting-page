(function () {
  var app = angular.module("app", []);
  app.controller("ItemController", [
    "$scope",
    "$http",
    function (scope, $http) {
      var c = this;
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
        /*if (!c.isIOS()){
          document.getElementById("myIframe").src =
            response.data.objectData.urlLogin.replace(
              "%3Fpageid=",
              encodeURIComponent(window.location.search)
            );
        }else{*/
          window.location.href = response.data.objectData.urlLogin.replace(
            "%3Fpageid=",
            encodeURIComponent(window.location.search)
          );
        // }
      };
      c.init = function () {
        c.callPageGet();
      };
      c.isIOS = function() {
        return [
          'iPad Simulator',
          'iPhone Simulator',
          'iPod Simulator',
          'iPad',
          'iPhone',
          'iPod'
        ].includes(navigator.platform)
        // iPad on iOS 13 detection
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
      }
    },
  ]);
  app.config([
    "$qProvider",
    function ($qProvider) {
      $qProvider.errorOnUnhandledRejections(false);
    },
  ]);
})();
