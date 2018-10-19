/**
 * Created by user on 23/10/2016.
 */
var myapp = angular.module('demoMongo',[]);
myapp.run(function ($http) {
    // Sends this header with any AJAX request
    $http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // Send this header only in post requests. Specifies you are sending a JSON object
    $http.defaults.headers.post['dataType'] = 'json'
});

myapp.controller('MongoRestController',function($scope,$http){
    $scope.insertData = function(){
        console.log($scope.formData.lname);
        console.log($scope.formData.fname);
        console.log($scope.formData.email);
        console.log($scope.formData.classID);
        console.log($scope.formData.major);
        console.log($scope.formData.course);

        var req = $http.post('http://127.0.0.1:8081/insert',$scope.formData);
        req.success(function(data) {
            console.log(data);
        });
        req.error(function(data) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
    $scope.searchData = function(){
        var name = $scope.formData.search2;
        var dataUp = { major: name };
        var req = $http.post('http://127.0.0.1:8081/search',dataUp);
        req.success(function(data) {
            var myArray = [];
            for (var i = 0; i < data.items.length; i++) {
                FirstName = data.items[i].fname;
                LastName = data.items[i].lname;
                Email = data.items[i].email;
                myArray.push({
                    results1: "The result: "+" \n First Name: " + FirstName + "  \n Last Name: " + LastName + "  \n Email: " + Email + " \n =============================="
                })
            }
            $scope.itemResults = myArray;

        });
        req.error(function(data) {
            alert( "failure message: " + JSON.stringify({data: data}));
        });
    };
});