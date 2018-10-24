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

    $scope.GenderOption = ["Male", "Female"];
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
                    alert("Opps!, Action could not be completed. Please enter person details again <br />" + response.message);
                })
            }
        };
});

myApp.controller('EditController', ['$scope', '$routeParams', 'MSApi', function ($scope, $routeParams, MSApi) {
    //$scope.message = "In Edit view";
    $scope.GenderOption = ["Male", "Female"];
    $scope.Id = $routeParams.Id;

    $scope.hidden = false;
    if ($routeParams.Id == 0)
        $scope.hidden = true;
        

    getPerson($routeParams.Id);
    function getPerson(Id) {

        MSApi.getPerson(Id).then(function mySuccess(response) {
            $scope.person = response.data;
        }, function myError(response) {
            alert("Opps!, Action could not be completed.Please, wait few minutes and try again < br /> " + response.message);
        })
    }

    $scope.editPerson =
        function editPerson() {

            $scope.person;
            if ($scope.person.FirstName == undefined || $scope.person.SurName == undefined || $scope.person.Gender == undefined
                || $scope.person.Email == undefined || $scope.person.PhoneNumber == undefined) {
                alert("Please fill all mandatory field");
            }
            else {
                var newPerson = {
                    'FirstName': $scope.person.FirstName,
                    'Surname': $scope.person.SurName,
                    'Gender': $scope.person.Gender,
                    'Email': $scope.person.Email,
                    'PhoneNumber': $scope.person.PhoneNumber,
                    'PersonId': $scope.person.PersonId
                };
                MSApi.editPerson(newPerson).then(function mySuccess(response) {
                    alert("Thanks, Person Edited");
                    $scope.firstname = undefined;
                    $scope.lastname = undefined;
                    $scope.Gender = undefined;
                    $scope.email = undefined;
                    $scope.PhoneNumber = undefined;
                    $location.path('Home');
                }, function myError(response) {
                    alert("Opps!, Action could not be completed. Please amend person details again <br />" + response.message);
                })
            }
        };

}]);

myApp.controller('DeleteController', ['$scope', '$routeParams', 'MSApi', '$location', function ($scope, $routeParams, MSApi, $location) {
    //$scope.message = "In Delete view";
    $scope.Id = $routeParams.Id;

    $scope.hidden = false;
    if ($routeParams.Id == 0)
        $scope.hidden = true;

    getPerson($routeParams.Id);
    function getPerson(Id) {

        MSApi.getPerson(Id).then(function mySuccess(response) {
            $scope.person = response.data;
        }, function myError(response) {
            alert("Opps!, Action could not be completed. Please, wait few minutes and try again < br /> " + response.message);
        })
    }

    $scope.deletePerson =
    function deletePerson() {

        MSApi.deletePerson($scope.person.PersonId).then(function mySuccess(response) {
            alert("Thanks, Person Deleted");
            $scope.person.FirstName = undefined;
            $scope.person.SurName = undefined;
            $scope.person.Gender = undefined;
            $scope.person.Email = undefined;
            $scope.person.PhoneNumber = undefined;
        }, function myError(response) {
            alert("Opps!, Action could not be completed.Please, wait few minutes and try again < br /> " + response.message);
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
