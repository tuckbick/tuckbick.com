define([
    'angular',
    'jquery',
    'fastclick'
], function(angular, $, FastClick) {

    $(function() {
        FastClick.attach(document.body);
    });

    var Ctrl = function($rootScope, $scope, $document) {
        var $html = $($document[0].documentElement);
        $rootScope.$on('$stateChangeSuccess', function(next, current) { 
            current.name && $html.attr('data-color',current.name);
        });
    }

    Ctrl.$inject = ['$rootScope', '$scope', '$document']
    return Ctrl
})
