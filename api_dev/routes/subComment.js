'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var SubComment = require('../models/subComment.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');

/* GET /subComment */
router.get('/', function(req, res, next) {
  SubComment.find().populate({path : 'user_id', model: 'User'}).exec(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* POST /subComment */
router.post('/', function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    },function (err, user) {
      if (err) return next(err);
      if (!user) return res.status(400).json({success: false, msg: 'User was not found with this token'});
      if (!req.body.content) return res.status(400).json({success: false, msg: 'No content was found in the sub comment'});

      Comment.findById(req.body.comment_id, function (err, comment) {
        if (err) return next(err);
        SubComment.create({
          user_id: user,
          content: req.body.content,
          comment_id: req.body.comment_id
        }, function (err, subComment) {
          if (err) return next(err);
          comment.sub_comments.push(subComment._id);
          comment.save();


          SubComment.populate(subComment, {path : 'user_id', model: 'User'}, function (err, subComment) {

            res.json({success: true, sub_comment:subComment});
          })

        });
      })
    })
  }
  else {
    res.status(403).json({success: false, msg: 'You dont have enought rights'});
  }

});


/* GET /subComment/:id */
router.get('/:id', function(req, res, next) {
  SubComment.findById(req.params.post_id).populate({path : 'user_id', model: 'User'}).exec(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* PUT /subComment/:id */
router.put('/:id', function(req, res, next) {
  SubComment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /subComment/:id */
router.delete('/:id', function(req, res, next) {
  SubComment.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

