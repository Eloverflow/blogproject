'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');
var SubComment = require('../models/subComment.js');

/* POST /facebook */
router.post('/', function(req, res, next) {

    User.findOneAndUpdate({
        email: req.body.email
    },{
        picture: req.body.picture,
        facebook_id: req.body.userID,
        name: req.body.name,
        password: 'facebookUser'
    },function (err, user) {
        if (err) return next(err);
        if(user == null){
             User.create({
                picture: req.body.picture,
                email: req.body.email,
                facebook_id: req.body.userID,
                name: req.body.name,
                password: 'facebookUser'
            }, function (err, user) {
                if (err) return next(err);
                 user.save(function(err) {
                     if (err) {
                         return res.json({success: false, msg: 'Username already exists.'});
                     }
                     res.json(user);
                 });

             });

        }
        else {
            user.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Username already exists.'});
                }
                res.json(user);
            });
        }



    })


});

module.exports = router;

