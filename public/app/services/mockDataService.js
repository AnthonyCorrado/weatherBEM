(function() {
    'use strict';

    angular
        .module('weatherApp.services')
        .factory('mockData', mockData);

    mockData.$inject = ['$http'];

    function mockData($http) {
        return {
            getForecasts: getForecasts
        };

        function getForecasts() {
            return $http.get('/app/services/mocks/mockForecasts.json')
                .then(mockForecastsComplete)
                .catch(mockForecastsFailed);

            function mockForecastsComplete(response) {
                return response.data;
            }

            function mockForecastsFailed(error) {
                console.log(error.data);
            }
        }



    }

})();