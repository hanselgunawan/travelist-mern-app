var express = require('express');
var router = require('./routes/routes.js');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));

// mongoose.connect('mongodb://heroku_z2kf60vq:epmo719bta4lhrjd230gpifu20@ds121248.mlab.com:21248/heroku_z2kf60vq');//setting and go to Config Variables

mongoose.connect('mongodb://localhost/travelist');
console.log(mongoose.connection.readyState);

app.use('/', router);

module.exports=app;