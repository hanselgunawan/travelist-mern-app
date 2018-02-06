var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var travelistSchema = new Schema({
    title: String,
    description: String,
    listImg: String
});

module.exports = mongoose.model('travellerlists', travelistSchema);