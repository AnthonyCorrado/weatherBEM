(function() {
    'use strict';

    angular
        .module('weatherApp.widgets')
        .directive('wbWidgetHeader', wbWidgetHeader);

    wbWidgetHeader.$inject = [];

    function wbWidgetHeader () {
        var directive = {
            scope: {
                'title': '@',
                'subtitle': '@',
                'rightText': '@'
            },
            templateUrl: 'app/widgets/widgetheader.html',
            restrict: 'A'
        };
        return directive;
    }
})();