'use strict';
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    article_id : { type: mongoose.Schema.Types.ObjectId, ref: 'ArticleSchema' },
    comment_id: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'CommentSchema'},
    content : { type: String, required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);

