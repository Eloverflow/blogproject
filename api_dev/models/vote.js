'use strict';
var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    is_upvote : { type: BOOLEAN, required: true },
    content : { type: String, required: true },
    user_id :  { type: ObjectId, ref: 'UserSchema' },
    comment_id: {type: ObjectId, required: false, ref: 'CommentSchema'}
});

module.exports = mongoose.model('Vote', VoteSchema);

