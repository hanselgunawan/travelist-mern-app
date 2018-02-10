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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://heroku_fktz0ch2:q9i16ljmkfub1pegdsvj3rfai1@ds231758.mlab.com:31758/heroku_fktz0ch2');//setting and go to Config Variables

// mongoose.connect('mongodb://localhost/travelist');
console.log(mongoose.connection.readyState);

app.use('/', router);

module.exports=app;