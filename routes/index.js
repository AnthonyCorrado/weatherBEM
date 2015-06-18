var express = require('express'),
    router = express.Router(),
    request = require('request');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/forecasts', function(req, res) {
    var url = 'http://api.openweathermap.org/data/2.5/forecast/daily?id=3882428&units=imperial';
    var body = [];

    request.get({
        url: url
    }, function(err, res, result) {
        if(err) {
            console.log(err);
            return callback(err);
        }
        console.log(result);
    });
});



module.exports = router;
