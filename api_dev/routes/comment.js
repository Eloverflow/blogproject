'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.js');
var Post = require('../models/post.js');

/* GET /comments listing. */
router.get('/', function(req, res, next) {
  Comment.find(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* POST /comments */
router.post('/', function(req, res, next) {
  Post.findById(req.body.post_id,function (err, post) {
    if (err) return next(err);
    Comment.create(req.body, function (err, comment) {
      if(err) return next(err);
      post.comments.push(comment._id);
      post.save();

      res.json(comment);
    });
/*
    Comment.create(req.body, function (err, post) {
    if(err) return next(err)
    next(res.json(post));*/
  });
});


/* GET /comments/id */
router.get('/:id', function(req, res, next) {
  Comment.findById(req.params.post_id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /comments/:id */
router.put('/:id', function(req, res, next) {
  Comment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /comments/:id */
router.delete('/:id', function(req, res, next) {
  Comment.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

