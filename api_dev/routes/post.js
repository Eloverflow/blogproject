'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');
var Comment = require('../models/comment.js');
var SubComment = require('../models/subComment.js');

/* GET /post listing. */
router.get('/', function(req, res, next) {
  Post.find(function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* GET /pantalons listing. */
router.get('/:id/comments', function(req, res, next) {
      /*function (err, comments) {
       if (err) return next(err);
       res.json(comments);
       }*/
      Comment.find({post_id: req.params.id}).populate('Comment.Subcomment').exec(function (err, comments) {
        if (err) return next(err);
        res.json(comments);
      });
  /*comments.forEach(function(comment) {
   SubComment.find({comment_id: comment._id}, function (err, subComments) {
   comment.subComments = subComments;
   })
   });*/


});

/* POST /pantalons */
router.post('/', function(req, res, next) {
  Post.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /pantalons/id */
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /pantalons/:id */
router.put('/:id', function(req, res, next) {
  Post.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /pantalons/:id */
router.delete('/:id', function(req, res, next) {
  Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

