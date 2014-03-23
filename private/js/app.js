define([
  'angular',

  // controllers
  'MainCtrl', 'BlogCtrl', 'ProjectsCtrl', 'ResumeCtrl', 'ContactCtrl',

  // services
  'ContactSvc',

  // other
  'ui.router'

], function(
  angular,
  MainCtrl, BlogCtrl, ProjectsCtrl, ResumeCtrl, ContactCtrl,
  ContactSvc,
  uiRouter
) {

  // Declare app level module which depends on filters, and services
  var app = angular.module('tuckbick', [
    'ui.router'
  ])

  app.controller('MainCtrl', MainCtrl);
  app.controller('BlogCtrl', BlogCtrl);
  app.controller('ProjectsCtrl', ProjectsCtrl);
  app.controller('ResumeCtrl', ResumeCtrl);
  app.controller('ContactCtrl', ContactCtrl);

  app.service('ContactSvc', ContactSvc);

  app.config(['$locationProvider', '$urlRouterProvider', '$stateProvider',
    function($locationProvider, $urlRouterProvider, $stateProvider) {
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise("/");
      $stateProvider
        .state('blog', {
          url: "/",
          templateUrl: "partials/blog.html",
          controller: 'BlogCtrl'
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
        .state('contact', {
          url: "/contact",
          templateUrl: "partials/contact.html",
          controller: 'ContactCtrl'
        })
    }
  ]);

  angular.bootstrap(document, ['tuckbick']);

  return app

})