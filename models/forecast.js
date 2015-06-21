var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var forecastSchema = new Schema({
    cityId: Number,
    cityName: String,
    currentTemp: Number,
    hiTemp: Number,
    loTemp: Number,
    icon: String,
    date: Number
});
 
module.exports = mongoose.model('forecasts', forecastSchema);