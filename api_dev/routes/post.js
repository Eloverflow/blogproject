'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');
var SubComment = require('../models/subComment.js');
/* GET /post listing. */
router.get('/', function(req, res, next) {
  Post.find().populate({path : 'user_id'}).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* GET /post */
router.get('/:id/comments', function(req, res, next) {
    Comment.find({post_id: req.params.id}).populate({path : 'sub_comments', populate: { path: 'user_id' }}).populate({path : 'votes'}).populate({path : 'user_id'}).exec(function (err, comments) {
      if (err) return next(err);
      res.json(comments);
    });
});

/* POST /post */
router.post('/', function(req, res, next) {

  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    },function (err, user) {
      if (err) return next(err);

      Post.create({
        user_id: user._id,
        content: req.body.content,
        title: req.body.title,
        tags: req.body.tags
      }, function (err, post) {
        if (err) return next(err);
        res.json(post);
      });

    })
  }


});

/* GET /post/:id */
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /post/:id */
router.put('/:id', function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /post/:id */
router.delete('/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

