var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var travel = require('../../models/TravelList');

router.get('/', function(req, res){
    res.render('index')
});

router.route('/insert/:key').post(function (req, res) {
    let listID = req.params.key;
    const doc = {
        mylist:listID,
        title:req.body.title,
        subtitle:req.body.subtitle,
        description:req.body.description,
        img:req.body.img,
        tags:req.body.tags,
        userID:req.body.userID,
        userName:req.body.userName,
        userIcon:req.body.userIcon,
        publishedDate:req.body.publishedDate,
        lastUpdated:req.body.lastUpdated,
        listCategory:req.body.listCategory,
        listIcon:req.body.listIcon,
        places:req.body.places
    };
    console.log(doc);
    let ObjectId = mongojs.ObjectID;
    travel.update({_id: ObjectId(listID)}, doc, function (err,result) {
        if(err)res.send(err);
        res.send('Draw successfully edited!');
    });
});

router.route('/update').post(function (req,res) {
    const doc = {
        headline:req.body.headline,
        web_url:req.body.web_url,
        saved_date:req.body.saved_date
    };
    console.log(doc);

    travel.update({_id:req.body._id}, doc, function (err,result) {
        if(err)res.send(err);
        res.send('Expense successfully updated!');
    });
});

router.get('/delete', function (req,res) {
    var id = req.query.id;
    travel.find({_id:id}).remove().exec(function (err, nyt) {
        if(err) res.send(err);
        res.send('Expense successfully deleted!');
    });
});

router.get('/getAll', function (req,res) {
    travel.find({}, function (err, result) {
        if(err) res.send(err);
        res.json(result);
    });
});

module.exports = router;