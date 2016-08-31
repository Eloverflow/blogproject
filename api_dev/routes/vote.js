'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Vote = require('../models/vote.js');
var Comment = require('../models/comment.js');

/* GET /pantalons listing. */
router.get('/', function(req, res, next) {
  Vote.find(function (err, vote) {
    if (err) return next(err);
    res.json(vote);
  });
});

/* POST /pantalons */
router.post('/', function(req, res, next) {

  Comment.findById(req.body.comment_id,function (err, comment) {
    if (err) return next(err);
    Vote.create(req.body, function (err, vote) {
      if(err) return next(err);
      comment.votes.push(vote._id);
      comment.save();

      res.json(vote);
    });


/*
    Vote.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);*/
  });
});

/* GET /pantalons/id */
router.get('/:id', function(req, res, next) {
  Vote.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /pantalons/:id */
router.put('/:id', function(req, res, next) {
  Vote.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /pantalons/:id */
router.delete('/:id', function(req, res, next) {
  Vote.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

