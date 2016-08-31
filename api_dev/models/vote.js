'use strict';
var mongoose = require('mongoose');

var VoteSchema = new mongoose.Schema({
    is_upvote : { type: Boolean, required: true },
   /* user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },*/
    comment_id: {type: mongoose.Schema.Types.ObjectId, ref: 'CommentSchema'}
},
{
    timestamps: true
});


module.exports = mongoose.model('VoteSchema', VoteSchema);

