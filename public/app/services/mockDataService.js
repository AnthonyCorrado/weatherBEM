(function() {
    'use strict';

    angular
        .module('weatherApp.services')
        .factory('mockData', mockData);

    mockData.$inject = ['$http', 'iconService'];

    function mockData($http, iconService) {
        return {
            getForecasts: getForecasts
        };

        function getForecasts() {
            return $http.get('/app/services/mocks/mockForecasts.json')
                .then(mockForecastsComplete)
                .catch(mockForecastsFailed);

            function mockForecastsComplete(response) {
                for (var i = 0; i < response.data.length; i++) {
                    var status = response.data[i].list[0].weather[0].main;
                    var icon = iconService.getIcon(status);
                    response.data[i].icon = icon;
                }

                return response.data;
            }

            function mockForecastsFailed(error) {
                console.log(error.data);
            }
        }



    }

})();