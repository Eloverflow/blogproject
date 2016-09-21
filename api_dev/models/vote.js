'use strict';
var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    is_upvote : { type: Boolean, required: [true, 'Vote type is required']  },
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', required: [true, 'User of reference is required']  },
    comment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'CommentSchema', required: [true, 'Post of reference is required'] }
},
{
    timestamps: true
});


module.exports = mongoose.model('Vote', VoteSchema);

