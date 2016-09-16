'use strict';
var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', required: [true, 'User of reference is required'] },
    post_id : { type: mongoose.Schema.Types.ObjectId, ref: 'PostSchema', required: [true, 'Post of reference is required']},
    content : { type: String, required: [true, 'Content is required'] },
    sub_comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCommentSchema' }],
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VoteSchema' }]
},
{
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);

