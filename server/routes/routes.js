var express = require('express');
var router = express.Router();
var mongojs = require("mongojs");
var Travel = require('../../models/TravelList');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function(req, res){
    res.render('index')
});

router.route('/insert').post(function (req, res) {
    let travel = new Travel();
    travel.title=req.body.title;
    travel.subtitle=req.body.subtitle;
    travel.description=req.body.description;
    travel.img=req.body.img;
    travel.tags=req.body.tags;
    travel.userID=req.body.userID;
    travel.userName=req.body.userName;
    travel.userIcon=req.body.userIcon;
    travel.publishedDate=req.body.publishedDate;
    travel.lastUpdated=req.body.lastUpdated;
    travel.listCategory=req.body.listCategory;
    travel.listIcon=req.body.listIcon;
    travel.places=req.body.places;

    Travel.find({title: req.body.title}, function (error, result) {
        if(!result.length)
        {
            travel.save(function (err) {
                if(err) res.send(err);
                res.send('List successfully added!');
            });
        }
    });
});

router.route('/update/:key').post(function (req, res) {
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
    Travel.update({_id: ObjectId(listID)}, doc, function (err,result) {
        if(err)res.send(err);
        res.send('List successfully edited!');
    });
});

router.get('/delete', function (req,res) {
    var id = req.query.id;
    Travel.find({_id:id}).remove().exec(function (err, nyt) {
        if(err) res.send(err);
        res.send('List successfully deleted!');
    });
});

router.get('/getAll/:listID', function (req,res) {
    let ObjectId = mongojs.ObjectID;
    Travel.find({_id:ObjectId(req.params.listID)}, function (err, result) {
        if(err) res.send(err);
        res.json(result);
    });
});

router.get('/getAllList/:userID', function (req,res) {
    let ObjectId = mongojs.ObjectID;
    Travel.find({userID:req.params.userID}, function (err, result) {
        if(err) res.send(err);
        res.json(result);
    });
});

module.exports = router;