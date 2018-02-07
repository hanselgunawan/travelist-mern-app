var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var travelistSchema = new Schema({
    title: String,
    description: String,
    listImg: String,
    tags:[],
    places:[
        {
            placeTitle: String,
            placeDescription: String,
            placeLocation: String,
            placeLongitude: String,
            placeLatitude: String,
            placePhone: String,
            placeImage: []
        }
    ]
});

module.exports = mongoose.model('travellerlists', travelistSchema);