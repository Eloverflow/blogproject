'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var SubComment = require('../models/subComment.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');

/* GET /comments listing. */
router.get('/', function(req, res, next) {
  SubComment.find().populate({path : 'user_id'}).exec(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
  });
});

/* POST /sub comments */
router.post('/', function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    },function (err, user) {
      if (err) return next(err);

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

          res.json(subComment);
        });
      })
    })
  }

});


/* GET /comments/id */
router.get('/:id', function(req, res, next) {
  SubComment.findById(req.params.post_id).populate({path : 'user_id'}).exec(function (err, comment) {
    if (err) return next(err);
    res.json(comment);
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

