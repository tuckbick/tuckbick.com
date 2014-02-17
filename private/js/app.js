define([
  'angular',

  // controllers
  'MainCtrl', 'HomeCtrl', 'ProjectsCtrl', 'ResumeCtrl', 'ConnectCtrl',

  // other
  'ui.router'

], function(
  angular,
  MainCtrl, HomeCtrl, ProjectsCtrl, ResumeCtrl, ConnectCtrl,
  uiRouter
) {

  // Declare app level module which depends on filters, and services
  var app = angular.module('tuckbick', [
    'ui.router'
  ])

  app.controller('MainCtrl', MainCtrl);
  app.controller('HomeCtrl', HomeCtrl);
  app.controller('ProjectsCtrl', ProjectsCtrl);
  app.controller('ResumeCtrl', ResumeCtrl);
  app.controller('ConnectCtrl', ConnectCtrl);

  app.config(['$locationProvider', '$urlRouterProvider', '$stateProvider',
    function($locationProvider, $urlRouterProvider, $stateProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('home', {
          url: "/",
          templateUrl: "partials/home.html",
          controller: 'HomeCtrl'
        })
        .state('projects', {
          url: "/projects",
          templateUrl: "partials/projects.html",
          controller: 'ProjectsCtrl'
        })
        .state('resume', {
          url: "/resume",
          templateUrl: "partials/resume.html",
          controller: 'ResumeCtrl'
        })
        .state('connect', {
          url: "/connect",
          templateUrl: "partials/connect.html",
          controller: 'ConnectCtrl'
        })
    }
  ]);

  angular.bootstrap(document, ['tuckbick']);

  return app

})