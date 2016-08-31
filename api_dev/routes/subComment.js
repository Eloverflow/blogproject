'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var SubComment = require('../models/subComment.js');
var Comment = require('../models/comment.js');

/* GET /comments listing. */
router.get('/', function(req, res, next) {
  SubComment.find(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* POST /comments */
router.post('/', function(req, res, next) {

  Comment.findById(req.body.comment_id,function (err, comment) {
    if (err) return next(err);
    SubComment.create(req.body, function (err, subComment) {
      if(err) return next(err);
      comment.sub_comments.push(subComment._id);
      comment.save();

      res.json(comment);
    });



  })





});


/* GET /comments/id */
router.get('/:id', function(req, res, next) {
  SubComment.findById(req.params.post_id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /comments/:id */
router.put('/:id', function(req, res, next) {
  SubComment.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /comments/:id */
router.delete('/:id', function(req, res, next) {
  SubComment.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

