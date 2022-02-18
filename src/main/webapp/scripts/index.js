(function () {
  var app = angular.module("app", []);
  app.controller("ItemController", [
    "$scope",
    "$http",
    function (scope, $http) {
      var c = this;
      c.callPageGet = function () {
        var bodys = {};
        debugger;
        $http
          .post(
            "https://login.salesforce.com/services/oauth2/token?grant_type=password&client_id=3MVG9fMtCkV6eLhcqBaBXrA9owsyJlOKzhkHOMJ2Hy03gGkORmdXe.dgcFyIDd9Jwk_CmRKMeMd8u_NNLH0rW&client_secret=8611131FB3842F1008E402C43EF5F1BDE0EEC5614921189A340BFEE78D481EBC&password=AlphaCloud9fVBnxv3M4mndUufSA151Sd5p&username=relacionamento9@consultinghouse.com.br",
            bodys,
            { method: "POST", headers: { "Content-Type": "application/json" } }
          )
          .then(
            function successCallback(responseOauth) {
              $http
                .get(
                  "https://consulting-page.herokuapp.com/connection",
                  { Key: c.key },
                  {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                  }
                )
                .then(
                  function successCallback(response) {
                    c.handleGET(response, responseOauth);
                  },
                  function errorCallback(response) {
                    console.log(response);
                  }
                );
            },
            function errorCallback(response) {
              console.log(response);
            }
          );
      };
      c.handleGET = function (response, responseOauth) {
        /*if (!c.isIOS()){
          document.getElementById("myIframe").src =
            response.data.objectData.urlLogin.replace(
              "%3Fpageid=",
              encodeURIComponent(window.location.search)
            );
        }else{*/
          debugger;
          window.location.href = response.data.objectData.urlLogin
            .replace("%3Fpageid=", encodeURIComponent(window.location.search))
            .replace("{{accessToken}}", responseOauth.data.access_token);
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
