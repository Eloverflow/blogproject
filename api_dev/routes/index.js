'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});
/*
 router.get('/android', function(req, res) {
 return express.static('views/android-debug.apk');
 });
 */

module.exports = router;