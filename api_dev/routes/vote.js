'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Vote = require('../models/vote.js');
var Comment = require('../models/comment.js');
var User = require('../models/user.js');

/* GET /vote */
router.get('/', function(req, res, next) {
  Vote.find(function (err, vote) {
    if (err) return next(err);
    res.json(vote);
  });
});

/* POST /vote */
router.post('/', function(req, res, next) {

  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function (err, user) {
      if (err) return next(err);
      if (!user) return res.json({success: false, msg: 'User was not found with this token'});
      if (!req.body.comment_id) return res.json({success: false, msg: 'Comment was not found with this ID'});

      Vote.findOne({
        comment_id: req.body.comment_id,
        user_id: user._id
      }, function (err, vote) {
        if (err) return next(err);

        Comment.findById(req.body.comment_id, function (err, comment) {
          if (err) return next(err);

          if (vote == null || vote.length == 0) {

            Vote.create({
              user_id: user,
              comment_id: req.body.comment_id,
              is_upvote: req.body.is_upvote
            }, function (err, vote) {
              if (err) return next(err);
              comment.votes.push(vote._id);
              comment.save();

              res.json({success:true, vote: vote});
            });

          }
          else {
            if (vote.is_upvote != req.body.is_upvote) {

              Vote.findByIdAndRemove(vote.id, vote, function (err, deletedVote) {
                if (err) return next(err);

                Vote.create({
                  user_id: user,
                  comment_id: req.body.comment_id,
                  is_upvote: req.body.is_upvote
                }, function (err, vote) {
                  if (err) return next(err);
                  comment.votes.push(vote._id);
                  comment.save();

                  res.json({success:true, vote: vote});
                });
              });

            }
            else {
              res.json({success: false, msg: 'You already voted'});
            }
          }

        });
      });

    });
  }

});

/* GET /vote/:id */
router.get('/:id', function(req, res, next) {
  Vote.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /vote/:id */
router.put('/:id', function(req, res, next) {
  Vote.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /vote/:id */
router.delete('/:id', function(req, res, next) {
  Vote.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

