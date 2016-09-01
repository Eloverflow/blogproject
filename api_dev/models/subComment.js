'use strict';
var mongoose = require('mongoose');

var SubCommentSchema = new mongoose.Schema({
    comment_id : { type: mongoose.Schema.Types.ObjectId, ref: 'CommentSchema' },
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    content : { type: String, required: true }
},
{
    timestamps: true
});


module.exports = mongoose.model('SubComment', SubCommentSchema);



