/// <reference path="scripts/angular.js" />


var myApp = angular.module("myApp", ['ngRoute','MyService']);

myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
            when('/Add', {
                templateUrl: "Views/add.html",
                controller: "AddController"
            }).
            when('/Edit/:Id', {
                templateUrl: "Views/edit.html",
                controller: "EditController"
            }).
            when('/Delete/:Id', {
                templateUrl: "Views/delete.html",
                controller: "DeleteController"
            }).
            when('/Home', {
                templateUrl: "Views/home.html",
                controller: "HomeController"
            }).
            otherwise({
                redirectTo : '/Home'
            })
    }]);


myApp.controller('AddController', function ($scope, MSApi) {
    //$scope.message = "In Add view";

    $scope.GenderOption = { "Male": "M", "Female": "F" };
    $scope.addPerson =
        function addPerson() {

            if ($scope.FirstName == undefined || $scope.Surname == undefined || $scope.Gender == undefined
                || $scope.Email == undefined || $scope.PhoneNumber == undefined) {
                alert("Please fill all mandatory field");
            }
            else {
                var newPerson = {
                    'FirstName': $scope.FirstName,
                    'Surname': $scope.Surname,
                    'Gender': $scope.Gender,
                    'Email': $scope.Email,
                    'PhoneNUmber': $scope.PhoneNumber
                };
                MSApi.addPerson(newPerson).then(function mySuccess(response) {
                    alert("Thanks, Person Added");
                    $scope.firstname = undefined;
                    $scope.lastname = undefined;
                    $scope.Gender = undefined;
                    $scope.email = undefined;
                    $scope.PhoneNumber = undefined;
                }, function myError(response) {
                    alert("Error while adding Person, Please enter person details again");
                })
            }
        };
});

myApp.controller('EditController', ['$scope', '$routeParams', function ($scope, $routeParams, MSApi) {
    $scope.message = "In Edit view";
    $scope.GenderOption = { "Male": "M", "Female": "F" };
    $scope.Id = $routeParams.Id;

    getPerson($routeParams.Id);
    function getPerson(Id) {

        MSApi.getPerson(Id).then(function mySuccess(response) {
            $scope.person = response.data;
        }, function myError(response) {
            alert("Error while fetching person");
        })
    }

    $scope.editPerson =
        function editPerson() {

            if ($scope.FirstName == undefined || $scope.Surname == undefined || $scope.Gender == undefined
                || $scope.Email == undefined || $scope.PhoneNumber == undefined) {
                alert("Please fill all mandatory field");
            }
            else {
                var newPerson = {
                    'FirstName': $scope.FirstName,
                    'Surname': $scope.Surname,
                    'Gender': $scope.Gender,
                    'Email': $scope.Email,
                    'PhoneNUmber': $scope.PhoneNumber
                };
                MSApi.editPerson(newPerson).then(function mySuccess(response) {
                    alert("Thanks, Person Edited");
                    $scope.firstname = undefined;
                    $scope.lastname = undefined;
                    $scope.Gender = undefined;
                    $scope.email = undefined;
                    $scope.PhoneNumber = undefined;
                }, function myError(response) {
                    alert("Error while editing Person, Please amend person details again");
                })
            }
        };

}]);

myApp.controller('DeleteController', ['$scope', '$routeParams', function ($scope, $routeParams, MSApi) {
    $scope.message = "In Delete view";
    $scope.Id = $routeParams.Id;

    getPerson($routeParams.Id);
    function getPerson(Id) {

        MSApi.getPerson(Id).then(function mySuccess(response) {
            $scope.person = response.data;
        }, function myError(response) {
            alert("Error while fetching person");
        })
    }

    $scope.editPerson =
    function deletePerson() {

        MSApi.deletePerson($scope.PersonId).then(function mySuccess(response) {
            alert("person Deleted");
        }, function myError(response) {
            alert("Error while deleting person");
        })
    }
}]);

myApp.controller('HomeController', function ($scope, MSApi) {
    $scope.message = "In Home view";

    getPeople();
    function getPeople() {

        MSApi.getPeople().then(function mySuccess(response) {
            $scope.people = response.data;
        }, function myError(response) {
            $scope.fName = response.statusText;
        })
    }

});
