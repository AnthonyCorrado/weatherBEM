var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
 
var timestampSchema = new Schema({
    lastUpdated: Number
});
 
module.exports = mongoose.model('timestamps', timestampSchema);