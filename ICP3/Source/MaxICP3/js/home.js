/**
 * Created by user on 24/02/2016.
 */
var myapp = angular.module( 'homeModule', ['googleOauth','FacebookProvider'] );

myapp.config( function (TokenProvider) {
    var baseUrl = document.URL.replace( '/home.html', '' );
    TokenProvider.extendConfig( {
        clientId: '202317690708-062ts2disvkoi7lfm6strp08updu3n45.apps.googleusercontent.com',
        redirectUri: baseUrl + '/home.html',  // allow lunching demo from a mirror
        scopes: ["https://www.googleapis.com/auth/userinfo.email"]
    } );
} );

myapp.controller( 'weatherctrl', function ($scope, $http,$rootScope,$log, $window, Token, Facebook,$http,$location) {
    $scope.accessToken = Token.get()
    $scope.getWeather = function () {
        var stii = document.getElementById("city").value;
        var stii1 = document.getElementById("state").value;
        $http.get( 'https://api.edamam.com/api/nutrition-data?app_id=f563ccff&app_key=8cf739178b5d54cbd9e686a5fccf32dd&ingr='+stii1+'%20' + stii ).success( function (data) {
            console.log(data);
            $scope.temp = data.calories;
            $scope.weather = data.totalWeight;
        } ).error(function(){
            alert("error")
        });
    };

    $rootScope.updateSession = function () {
        //reads the session variables if exist from php
        $rootScope.session = "hello";
    };
    $rootScope.updateSession();


    // button functions
    $scope.getLoginStatus = function () {
        Facebook.getLoginStatus();

    };

    $scope.login = function () {
        Facebook.login();
    };

    $scope.logout = function () {
        Facebook.logout();
        console.log("inside");
        $rootScope.facebook_id = "";
    };

    $scope.unsubscribe = function () {
        Facebook.unsubscribe();
    }

    $scope.getInfo = function () {
        FB.api( '/' + $rootScope.facebook_id, function (response) {
            console.log( 'Good to see you, ' + response.name + '.' + $rootScope.facebook_id );

        } );
        $rootScope.info = $rootScope.session;

    };


} );

function changeSource() {
    var txt1 = document.getElementById("text1").value;
    var url ='https://stream.watsonplatform.net/text-to-speech/api/v1/synthesize?username=b7c99c5d-962d-40ed-83a3-fcad5ccaa8bf&password=RdNoKEX2BkUV&text='+txt1;
    document.getElementById("source1").src=url;
    document.getElementById("video1").load();
}
