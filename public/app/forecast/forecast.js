(function() {
    'use strict';

    angular
        .module('weatherApp.forcast')
        .controller('Forecast', Forecast);

        Forecast.$inject = ['weather', 'mockData'];

        function Forecast(weather, mockData) {
            var vm = this;
            vm.weather = [];

            activate();

            function activate() {
                return mockData.getForecasts().then(function(data) {
                    vm.weather = data;
 
                    return vm.weather;
                });
            }
        }
})();