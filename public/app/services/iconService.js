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
                    icon = {
                        "logo": "wi-day-sunny",
                        "color": "yellow"
                    };
                    break;
                case "Rain":
                    icon = {
                        "logo": "wi-showers",
                        "color": "steelblue"
                    };
                    break;
                case "Clouds":
                    icon = {
                        "logo": "wi-cloudy",
                        "color": "dimgray"
                    };
                    break;
            }
            return icon;
        }
    }

})();