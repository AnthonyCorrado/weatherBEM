(function() {
    'use strict';

    angular
        .module('weatherApp.forcast')
        .controller('Forecast', Forecast);

        function Forecast(weather) {
            var vm = this;
            vm.weather = [];

            activate();

            function activate() {
                return weather.getTenDay().then(function(data) {
                    vm.weather = data;
 
                    return vm.weather;
                });
            }
        }
})();