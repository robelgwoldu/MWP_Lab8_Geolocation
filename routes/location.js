var express = require('express');
var assert = require('assert');
var db = require('../db');
var router = express.Router();

/* GET nearby locations */
router.get('/nearby', function(req, res, next) {
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;

    const title = "Nearby Locations";

    if(longitude && latitude) {
        longitude = Number(longitude);
        latitude = Number(latitude);
        var places = db.get().collection('places');
        var query = {
            location : {"$near" : [longitude, latitude]},
        };
        var fields = {name : 1};

        var options = {
            limit : 3
        };

        places.find(query, options).toArray(function(err, items) {

            res.locals.nearbyLocations = items;
            res.render('nearby_locations', {title : title});
        });


    }else {
        res.locals.nearbyLocations = null;
        res.render('nearby_locations', { title: title });
    }
});

router.post('/nearby', function(req, res, next) {
    "use strict";

    const title = "Nearby Locations";


    var longitude = req.body.longitudeValue;
    var latitude = req.body.latitudeValue;
    var category = req.body.category;
    var nameKey = req.body.name;


    if(longitude & latitude) {
        longitude = Number(longitude);
        latitude = Number(latitude);
        nameKey = '^${nameKey}';
        console.log("You are here" + longitude + nameKey);
        var places = db.get().collection('places');
        var query = {
            location : {"$near" : [longitude, latitude]},
            name : {"$regex" : nameKey},
            category : {"$regex" : category}
        };
        var options = {
            limit : 3
        };

        var places = db.get().collection('places');
        places.find(query, options).toArray(function(err, items) {

            res.locals.nearbyLocations = items;
            res.render('nearby_locations', {title : title});
        });
    }
})

router.get('/add', function(req, res, next) {
    "use strict";
    res.locals.success = null;
    res.render('new_location');
});
router.post('/add', function(req, res, next) {
    "use strict";
    const locationName = req.body.name;
    const locationCategory = req.body.category;
    const latitude = Number(req.body.gllpLatitude);
    const longitude = Number(req.body.gllpLongitude);

    const place = {
        name : locationName,
        category : locationCategory,
        location : [longitude, latitude]
    };

    var places = db.get().collection('places');
    places.insertOne(place, function(err, items) {
        if(err) throw err;
        res.locals.success = 'Added ${locationName} successfully! You can pick and add more locations';
        res.render('new_location');
    });

});

module.exports = router;
