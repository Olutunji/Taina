/// <reference path="scripts/angular.js" />


var myApp = angular.module("myApp", ['ngRoute', 'MyService', 'MyCache']);

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

            if ($scope.FirstName == undefined || $scope.Surname == undefined || $scope.Gender == undefined || $scope.Email == undefined) {
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
                    $scope.FirstName = undefined;
                    $scope.Surname = undefined;
                    $scope.Gender = undefined;
                    $scope.Email = undefined;
                    $scope.PhoneNumber = undefined;
                    //$location.path('#!Home');
                }, function myError(response) {
                    alert("Opps!, Action could not be completed. Please enter person details again");
                })
            }
        };
});

myApp.controller('EditController', ['$scope', '$routeParams', 'MSApi', '$location', 'MCache', function ($scope, $routeParams, MSApi, $location, MCache) {
    //$scope.message = "In Edit view";
    $scope.GenderOption = ["Male", "Female"];
    $scope.Id = $routeParams.Id;

    $scope.hidden = false;
    if ($routeParams.Id == 0)
        $scope.hidden = true;

    var selectedPerson = MCache.get($routeParams.Id)

    if (selectedPerson) {
        $scope.person = selectedPerson;
    }
    else {
        getPerson($routeParams.Id);
    }
    function getPerson(Id) {

        MSApi.getPerson(Id).then(function mySuccess(response) {
            $scope.person = response.data;
        }, function myError(response) {
            alert("Opps!, Action could not be completed.Please, wait few minutes and try again");
        })
    }

    $scope.editPerson =
        function editPerson() {

            $scope.person;
            if ($scope.person.FirstName == undefined || $scope.person.SurName == undefined || $scope.person.Gender == undefined || $scope.person.Email == undefined) {
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
                    $scope.person.FirstName = undefined;
                    $scope.person.SurName = undefined;
                    $scope.person.Gender = undefined;
                    $scope.person.Email = undefined;
                    $scope.person.PhoneNumber = undefined;
                    //$location.path('#!Home');
                }, function myError(response) {
                    alert("Opps!, Action could not be completed. Please amend person details again");
                })
            }
        };

}]);

myApp.controller('DeleteController', ['$scope', '$routeParams', 'MSApi', '$location', 'MCache', function ($scope, $routeParams, MSApi, $location, MCache) {
    //$scope.message = "In Delete view";
    $scope.Id = $routeParams.Id;

    $scope.hidden = false;
    if ($routeParams.Id == 0)
        $scope.hidden = true;

    var selectedPerson = MCache.get($routeParams.Id)

    if (selectedPerson) {
        $scope.person = selectedPerson;
    }
    else {
        getPerson($routeParams.Id);
    }
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
            MCache.remove($scope.person.PersonId);
            $scope.person.FirstName = undefined;
            $scope.person.SurName = undefined;
            $scope.person.Gender = undefined;
            $scope.person.Email = undefined;
            $scope.person.PhoneNumber = undefined;
        }, function myError(response) {
            alert("Opps!, Action could not be completed.Please, wait few minutes and try again");
        })

        //$location.path('#!Home');
    }
}]);

myApp.controller('HomeController', ['$scope', 'MSApi', 'MCache', function ($scope, MSApi, MCache) {
    $scope.message = "In Home view";

    //$scope.addToCache = function (key, value) {
    //    MCache.put(key, value)
    //};

    getPeople();
    function getPeople() {

        MSApi.getPeople().then(function mySuccess(response) {
            $scope.people = response.data;
            loadCache(response.data);
        }, function myError(response) {
            $scope.fName = response.statusText;
        })
    }

    function loadCache(people) {
        angular.forEach(people, function (person) {
            MCache.put(person.PersonId, person);
        })
    }

}]);
