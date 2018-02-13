var express = require('express');
var router = require('./routes/routes.js');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());
var mongoose = require('mongoose');
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'https://dry-chamber-76409.herokuapp.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(allowCrossDomain);

mongoose.connect('mongodb://heroku_fktz0ch2:q9i16ljmkfub1pegdsvj3rfai1@ds231758.mlab.com:31758/heroku_fktz0ch2');//setting and go to Config Variables

// mongoose.connect('mongodb://localhost/travelist');
console.log(mongoose.connection.readyState);

app.use('/', router);
module.exports=app;