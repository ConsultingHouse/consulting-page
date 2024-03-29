<html  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"   ng-app="app">
<head>
    <title>Forms CH</title>
    <!-- <meta name="viewport" content="width=device-width, user-scalable=no" charset="UTF-8"  http-equiv="Content-Security-Policy"/> -->
    <meta http-equiv="Content-Security-Policy" content="child-src https://* 'unsafe-eval'; default-src 'self' data: gap: https://* 'unsafe-eval';  style-src * self 'unsafe-inline' blob: data: gap: https://* 'unsafe-inline'; script-src * 'self' 'unsafe-eval' 'unsafe-inline' blob: data: gap: https://* https://*.documentforce.com; object-src * 'self' blob: data: gap:; img-src * self 'unsafe-inline' blob: data: gap:; connect-src self * 'unsafe-inline' blob: data: gap:; frame-src https://* 'unsafe-eval'; base-uri * self 'unsafe-inline' blob: data: gap:;">

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="/scripts/angular.min.js" type="text/javascript"></script>
    <link rel="stylesheet" type="text/css" href="/style/styles/salesforce-lightning-design-system.min.css">
    <link rel="stylesheet" type="text/css" href="/style/styles/SweetalertCss.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@8.2.5" charset="UTF-8"></script>
    <script src="/scripts/index.js" type="text/javascript"></script>
    <script type="text/javascript">
        window.config = {} 
    </script>
</head>
<body class="app {{containerClass}}" ng-controller="ItemController as c" ng-init="c.init()">
    <div class="lds-css ng-scope loading" ng-if="c.loading == true" ng-model="c.loading">
        <div class="lds-rolling">
            <div></div>
        </div>
    </div>
    <div id="contentData" style="margin: 0px;">
        <iframe id="myIframe" style="height:100%;width:100%;margin:0px" ></iframe>
    </div>
</body>
</html>
