'use strict';
var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    is_upvote : { type: Boolean, required: true },
    content : { type: String, required: true },
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    comment_id: {type: mongoose.Schema.Types.ObjectId, required: false, ref: 'CommentSchema'}
},
{
    timestamps: true
});


module.exports = mongoose.model('Vote', VoteSchema);

