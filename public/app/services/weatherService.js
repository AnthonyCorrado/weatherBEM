(function() {
    'use strict';

    angular
        .module('weatherApp.services')
        .factory('weather', weather);

    weather.$inject = ['$http', 'iconService'];
    
    function weather($http, iconService) {
        // hardcoded test
        var cityId = ['5368361', '5391959', '5037649', '4145381', '5746545', '6094817'],
            url = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=10&mode=json&&units=imperial&id=",
            allCitites = [];

        var service = {
            getForecasts: getForecasts
        };
        return service;

        // function getForecasts() {
        //     for (var i=0; i<cityId.length; i++) {
        //         // console.log(cityId[i]);
        //         return $http.get(url + cityId[i])
        //         .then(pushToArray)
        //         .catch(getForecastsFailed);

        //     }

        //     function pushToArray(response) {
        //         allCitites.push(response.data);
        //         console.log(allCitites);
        //         // getForecastsComplete(response);
        //     }

        //     function getForecastsComplete(response) {
        //         console.log(response);
        //         return response.data.city;
        //     }

        //     function getForecastsFailed(error) {
        //         console.log(error);
        //     }
        // }

        function getForecasts() {
                return $http.get('api/forecasts')
                .then(getForecastsComplete)
                .catch(getForecastsFailed);

            function getForecastsComplete(response) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    var iconType = response.data[i].icon;
                    var icon = iconService.getIcon(iconType);
                    response.data[i].icon = icon;
                }

                return response.data;
            }

            function getForecastsFailed(error) {
                console.log(error);
            }
        }
    }

})();