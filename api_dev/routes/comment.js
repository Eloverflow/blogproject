'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Comment = require('../models/comment.js');

/* GET /comments listing. */
router.get('/', function(req, res, next) {
  Comment.find(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* POST /comments */
router.post('/', function(req, res, next) {

  var comment = new Comment(req.body);
  comment.save(function(err){
    console.log(comment._id);
  });

  res.json(comment);
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

