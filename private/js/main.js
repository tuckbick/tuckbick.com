'use strict';


// Declare app level module which depends on filters, and services
var app = angular.module('tuckbick', [
  'ui.router'
]).
config([
  '$locationProvider',
  '$urlRouterProvider',
  '$stateProvider',
  function($locationProvider, $urlRouterProvider, $stateProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
      .state('home', {
        url: "/",
        templateUrl: "partials/home.html"
      })
      .state('connect', {
        url: "/connect",
        templateUrl: "partials/connect.html"
      })
  }
]);