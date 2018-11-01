/// <reference path="scripts/angular.js" />

var myCache = angular.module("MyCache", []);

myCache.factory("MCache", function ($cacheFactory) {
    return $cacheFactory('MCache');
});