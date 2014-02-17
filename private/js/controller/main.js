define([
  'angular',
  'jquery',
  'fastclick'
], function(angular, $, FastClick) {

  $(function() {
      FastClick.attach(document.body);
  });

  var Ctrl = function($scope) {
    
  }

  Ctrl.$inject = ['$scope']
  return Ctrl
})
