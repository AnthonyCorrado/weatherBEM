(function() {
    'use strict';

    angular
        .module('weatherApp.services')
        .factory('iconService', iconService);

    iconService.$inject = [];

    function iconService() {
        return {
            getIcon: getIcon
        };

        function getIcon(weather) {
            var icon = {};
            switch (weather) {
                case "Clear":
                    icon = "wi-day-sunny";
                    break;
                case "Rain":
                    icon = "wi-showers";
                    break;
                case "Clouds":
                    icon = "wi-cloudy";
                    break;
            }
            return icon;
        }
    }

})();