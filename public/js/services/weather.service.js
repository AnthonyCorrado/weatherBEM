(function() {
    'use strict';

    angular
        .module('weatherApp.services')
        .factory('weather', weather);

        weather.$inject = ['$http'];
    
    function weather($http) {
        // hardcoded test
        var url = "http://api.openweathermap.org/data/2.5/forecast/daily?lat=34.05&lon=-118.24&units=imperial";
        var service = {
            getTenDay: getTenDay
        };
        return service;

        function getTenDay() {
            return $http.get(url)
                .then(getTenDayComplete)
                .catch(getTenDayFailed);

            function getTenDayComplete(response) {
                console.log(response);
                return response.data;
            }

            function getTenDayFailed(error) {
                console.log(error);
            }
        }
    }

})();