var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var longitude = req.query.longitude;
    var latitude = req.query.latitude;
    const title = 'GeoLocator for Niegnbors';
    if(longitude && latitude) {
        longitude = Number(longitude);
        latitude = Number(latitude);

        db.get().collection('places').find({}, {'category' : 1}).toArray(function(err, items) {
            "use strict";
            if(err) throw err;

            res.locals.loading = null;
            res.locals.longitudeValue = longitude;
            res.locals.latitudeValue = latitude;
            res.locals.places = items;
            res.render('index', { title: title });
        });


    }else {
        res.locals.longitudeValue = null;
        res.locals.latitudeValue = null;
        res.locals.loading = "Getting your location...";
        res.render('index', { title: title });
    }
});

module.exports = router;
