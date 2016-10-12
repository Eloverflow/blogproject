'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/pressRelease.js');
var User = require('../models/user.js');
/* GET /post listing. */
router.get('/', function(req, res, next) {
  Post.find().populate({path : 'user_id', model: 'User'}).exec(function (err, post) {
    if (err) return next(err);
    res.json(post);
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
      if (!user) return res.status(400).json({success: false, msg: 'User was not found with this token'});

      if(user.is_admin){

        if (!req.body.contentFR) {
          res.status(400).json({success: false, msg: 'No french content was found in the post'});
        } else if (!req.body.contentEN) {
          res.status(400).json({success: false, msg: 'No english content was found in the post'});
        } else if (!req.body.title) {
          res.status(400).json({success: false, msg: 'No title was found in the post'});
        } else if (req.body.tags && req.body.tags.length > 20) {
          res.status(400).json({success: false, msg: 'Too many tags for the post'});
        }
        else{
          Post.create({
            user_id: user._id,
            content_fr: req.body.contentFR,
            content_en: req.body.contentEN,
            title: req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1),
            tags: req.body.tags
          }, function (err, post) {
            if (err) return next(err);
            res.json({success: true, post: post});
          });
        }

      }
      else{
        res.status(403).json({success: false, msg: 'You dont have enought rights'});
      }


    })
  }
  else {
    res.status(403).json({success: false, msg: 'No authentication token found'});
  }


});

/* POST /post */
router.post('/search', function(req, res, next) {

  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function (err, user) {
      if (err) return next(err);

      Post.find({$text :{$search: req.body.search}},
          { score : { $meta: "textScore" } }).sort({ score : { $meta : 'textScore' } })
          .exec(function(err, posts) {
            if (err) return next(err);

            Post.populate(posts,{path : 'user_id', model: 'User'},function (err, posts) {
              if (err) return next(err);
              res.json(posts);
            });

           // res.json(results);
          });
  });
  }


});

/* GET /post/:id */
router.get('/:id', function(req, res, next) {
  Post.findById(req.params.id, function (err, post) {
    if (err) return next(err);

    Post.populate(post,{path : 'user_id', model: 'User'},function (err, post) {
      if (err) return next(err);
      res.json(post);
    });

  });
});

/* PUT /post/:id */
router.put('/:id', function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    },function (err, user) {
      if (err) return next(err);
      if (!user) return res.status(400).json({success: false, msg: 'User was not found with this token'});

      if(user.is_admin){

        if (!req.body.contentFR) {
          res.status(400).json({success: false, msg: 'No french content was found in the post'});
        } else if (!req.body.contentEN) {
          res.status(400).json({success: false, msg: 'No english content was found in the post'});
        } else if (!req.body.title) {
          res.status(400).json({success: false, msg: 'No title was found in the post'});
        } else if (req.body.tags && req.body.tags.length > 20) {
          res.status(400).json({success: false, msg: 'Too many tags for the post'});
        }
        else{
          Post.findByIdAndUpdate(req.params.id, {
            content_fr: req.body.contentFR,
            content_en: req.body.contentEN,
            title: req.body.title.charAt(0).toUpperCase() + req.body.title.slice(1),
            tags: req.body.tags
          }, function (err, post) {
            if (err) return next(err);
            res.json({success: true, post: post});
          });
        }

      }
      else{
        res.status(403).json({success: false, msg: 'You dont have enought rights'});
      }


    })
  }
  else {
    res.status(403).json({success: false, msg: 'No authentication token found'});
  }


});

/* DELETE /post/:id */
router.delete('/:id', function(req, res, next) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    },function (err, user) {
      if (err) return next(err);
      if (!user) return res.status(400).json({success: false, msg: 'User was not found with this token'});

      if(user.is_admin){

        Post.findByIdAndRemove(req.params.id, req.body, function (err, post) {
          if (err) return next(err);
          res.json({success: true, post: post});
        });

      }
      else{
        res.status(403).json({success: false, msg: 'You dont have enought rights'});
      }


    })
  }
  else {
    res.status(403).json({success: false, msg: 'No authentication token found'});
  }

});

module.exports = router;

