'use strict';
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
});

module.exports = mongoose.model('Comment', CommentSchema);

