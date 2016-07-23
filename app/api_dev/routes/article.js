var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Article = require('../models/view_article.js');

/* GET /pantalons listing. */
router.get('/', function(req, res, next) {
  Article.find(function (err, acticle) {
    if (err) return next(err);
    res.json(article);
  });
});

/* POST /pantalons */
router.post('/', function(req, res, next) {
  Article.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* GET /pantalons/id */
router.get('/:id', function(req, res, next) {
  Article.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /pantalons/:id */
router.put('/:id', function(req, res, next) {
  Article.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE /pantalons/:id */
router.delete('/:id', function(req, res, next) {
  Article.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;

