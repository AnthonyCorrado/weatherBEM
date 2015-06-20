var express = require('express'),
    router = express.Router(),
    request = require('request'),
    Forecast = require('../models/forecast');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/forecasts', function(req, res) {
    Forecast.find(function(err, forecasts) {
        if (err) {
            console.log('dgo');
        return res.send(err);
        }
        res.send(forecasts);
        // res.json(forecasts);
    });
});

// router.get('/forecasts', function(req, res) {
//     var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=3882428&units=imperial';
//     var body = [];

//     request.get({
//         url: url
//     }, function(err, res, result) {
//         if(err) {
//             console.log(err);
//             return callback(err);
//         }
//         res.json(200, result);
//     });
// });


module.exports = router;
