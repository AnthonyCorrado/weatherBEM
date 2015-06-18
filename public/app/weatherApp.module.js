(function() {
    'use strict';

    angular.module('weatherApp', [

        // main service module
        'weatherApp.services',

        // features
        'weatherApp.forcast',
        'weatherApp.layout',

        // widgets
        'weatherApp.widgets'
    ]);

})();