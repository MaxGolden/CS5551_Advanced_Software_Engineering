'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])
    .controller('View1Ctrl', function ($scope, $http) {
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            $scope.venueList = new Array();
            var placeEntered = document.getElementById("txt_placeName").value;
            if (placeEntered != null) {
                document.getElementById('div_ReviewList').style.display = 'none';
                var handler = $http.get("https://ase5551-icp10.herokuapp.com/server", placeEntered);
                handler.success(function (data) {
                    if (data != null && data.items != null) {
                        for (var i = 0; i < 3; i++) {
                            $scope.venueList[i] = {
                                "name": data.items[i].name,
                                "price": data.items[i].salePrice,
                                "imageUrl": data.items[i].mediumImage,
                                "Msrp": data.items[i].msrp,
                                "Desc" : data.items[i].longDescription
                            };
                        }
                    }
                });
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        };
        $scope.getReviews = function (venue) {
            $scope.showt=true;
            $scope.shows=false;
            // console.log($scope.mostRecentReview);
            $scope.ReviewWithSentiment = {
                "Name" : venue.name,
                "SalePrice": venue.price,
                "Msrp": venue.Msrp,
                "Desc": venue.Desc };
            document.getElementById('div_ReviewList').style.display = 'block';
        };
    });

