!function(){var n=angular.module("app",[]);n.controller("ItemController",["$scope","$http",function(n,e){var o=this;o.key="",o.url="",o.callPageGet=function(){var n={Key:o.key};e.get("https://consulting-page.herokuapp.com/connection",n,{method:"GET",headers:{"Content-Type":"application/json"}}).then(function(n){o.handleGET(n)},function(n){console.log(n)})},o.handleGET=function(n){o.url=n.data.objectData.urlLogin,document.getElementById("myIframe").src=o.url.replace("pageid=","pageid="+window.location.search.split("?pageId=")[1])},o.init=function(){o.callPageGet()}}]),n.config(["$qProvider",function(n){n.errorOnUnhandledRejections(!1)}])}();