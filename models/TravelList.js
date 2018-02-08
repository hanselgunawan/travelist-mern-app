var mongoose = require('mongoose');
mongoose.set('debug', true);
var Schema = mongoose.Schema;

var travelistSchema = new Schema({
    title: String,
    subtitle: String,
    description: String,
    img: String,
    tags:[],
    userID: String,
    userName: String,
    userIcon: String,
    publishedDate: Date,
    lastUpdated: Date,
    listCategory: String,
    listIcon: String,
    places:[
        {
            placeTitle: String,
            placeDescription: String,
            placeName: String,
            placeLocation: String,
            placeLongitude: String,
            placeLatitude: String,
            placeAddress: String,
            placePhone: String,
            placeImage: []
        }
    ]
});

module.exports = mongoose.model('travellerlists', travelistSchema);