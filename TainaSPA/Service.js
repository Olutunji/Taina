/// <reference path="scripts/angular.js" />


var myService = angular.module("MyService", []);

myService.factory("MSApi", function ($http) {

    var baseUrl = "http://localhost:62332/api";
    var MSApi = {};

    MSApi.getPeople = function () {
        return $http.get(baseUrl + "/person", {cache : false});
    };

    MSApi.getPerson = function (personId) {
        return $http.get(baseUrl + "/person/" + personId);
    };

    MSApi.deletePerson = function (personId) {
        return $http.delete(baseUrl + "/person/" + personId);
    };

    MSApi.addPerson = function (personDtl) {
        return $http.post(baseUrl + "/person/", personDtl);
    };

    MSApi.editPerson = function (personDtl) {
        return $http.put(baseUrl + "/person/" + personDtl.PersonId, personDtl);
    };

    return MSApi;

});