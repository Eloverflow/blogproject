'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.js');
var Post = require('../models/post.js');
var User = require('../models/user.js');

/* GET /comment */
router.get('/', function(req, res, next) {
  Comment.find().populate({path : 'user_id', model: 'User'}).exec(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* POST /comment */
router.post('/', function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    },function (err, user) {
      if (err) return next(err);
      
      Post.findById(req.body.post_id,function (err, post) {
        if (err) return next(err);
        Comment.create({
          user_id: user,
          post_id: req.body.post_id,
          content: req.body.content
        },function (err, comment) {
          if(err) return next(err);
          post.comments.push(comment._id);
          post.save();

          res.json(comment);
        });
      });
    })
  }
});

/* GET /comment/:id */
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.post_id).populate({path : 'user_id', model: 'User'}).exec(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* PUT /comment/:id */
router.put('/:id', function(req, res, next) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /comment/:id */
router.delete('/:id', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

