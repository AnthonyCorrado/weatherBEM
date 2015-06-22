var express = require('express'),
    router = express.Router(),
    request = require('request'),
    Forecast = require('../models/forecast');
    Timestamp = require('../models/timestamp');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

// grabs all available forecasts from database
(function() {
    'use strict';

    router.get('/forecasts', function(req, res) {

        Forecast.find(function(err, forecasts) {
            if (err) {
                console.log(err);
                return res.send(err);
            }
            isUpdated();
            res.send(forecasts);
        });
    });
})();


function isUpdated() {
    var time = new Date().getTime();

    Timestamp.find(function(err, timestamp) {
        if (err) {
            return res.send(err);
        }
        if (timestamp) {
            if ((time - timestamp[0].lastUpdated) > 300000) {
                updateWeather();
            } else {
                console.log('no update needed');
            }
        } else {
            createTimestamp();
            updateWeather();
        }
    });
}

function createTimestamp() {
    var time = new Date().getTime();
    Timestamp.update({}, { $set: {lastUpdated: time}},
        function(err, response) {
            if (err) return console.error(err);
            console.log(response);
            console.log('time has been updated');
        });
}

function updateWeather() {
    var cityId = ['5368361', '5391959', '5037649', '4145381', '5746545', '6094817'],
        currentUrl = 'http://api.openweathermap.org/data/2.5/weather?units=imperial&id=',
        tenDayUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?cnt=10&mode=json&&units=imperial&id=",
        allCitites = [];

    for (var i = 0; i < cityId.length; i++) {
        getCurrent(cityId[i]);
        getTenDay(cityId[i]);
    }

    function getCurrent(id) {

        request.get({
            url: currentUrl + id
        }, function(err, res, result) {
            if(err) {
                console.log(err);
                return callback(err);
            }
            data = JSON.parse(res.body);
            console.log(data);

            var currentWeatherObj = {
                "cityId": data.id,
                "cityName": data.name,
                "currentTemp": data.main.temp,
                "icon": data.weather[0].main,
                "date": data.dt
            };

            function updateCurrent() {
                Forecast.update(
                    { cityId: data.id }, { $set: currentWeatherObj }, { multi: true, upsert: true },
                    function(err, response) {
                        if (err) return console.error(err);
                        console.log(response);
                    });
            }

            function updateTimestamp() {
                var time = new Date().getTime();
                Timestamp.update({"_id": "5585e4d7af1cdc96ab812c0e" }, { $set: {lastUpdated: time}},
                    function(err, response) {
                        if (err) return console.error(err);
                        console.log(response);
                        console.log('time has been updated');
                    });
            }
            updateCurrent();
            updateTimestamp();
        });

    }

    function getTenDay(id) {

        request.get({
            url: tenDayUrl + id
        }, function(err, res, result) {
            if(err) {
                console.log(err);
                return callback(err);
            }
            data = JSON.parse(res.body);

            var hiLoToday = {
                "hiTemp": data.list[0].temp.max,
                "loTemp": data.list[0].temp.min
            };

            function updateCurrentHiLo() {
                Forecast.update(
                    { cityId: data.city.id }, { $set: hiLoToday }, { multi: true, upsert: true },
                    function(err, response) {
                        if (err) return console.error(err);
                        console.log(response);
                    });
            }
            updateCurrentHiLo();
        });
    }

 
}
        // console.log(forecastObj);
        // var currentWeather = new Forecast(forecastObj);

        // currentWeather.save(function(err, response) {
        //     if (err) return console.error(err);
        //     console.log(response);
        // });


    // var test = new Forecast(
        // {
        //     "cityName": "San Francisco",
        //     "currentTemp": 59,
        //     "hiTemp": 72,
        //     "loTemp": 58,
        //     "icon": "Clouds",
        //     "date": 1434992600
        // }


    // test.save(function (err, test) {
    //     if (err) return console.error(err);
    // });

module.exports = router;
