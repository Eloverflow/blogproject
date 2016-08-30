'use strict';
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    /*user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },*/
    /*post_id : { type: mongoose.Schema.Types.ObjectId, ref: 'PostSchema' },*/
    /*comment_id: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'CommentSchema'},*/
    content : { type: String, required: true }
},
{
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);

