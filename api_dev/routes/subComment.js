'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var SubComment = require('../models/subComment.js');

/* GET /comments listing. */
router.get('/', function(req, res, next) {
  SubComment.find(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* POST /comments */
router.post('/', function(req, res, next) {
  SubComment.create(req.body, function (err, post) {
    if(err) return next(err)
    next(res.json(post));
  });
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

