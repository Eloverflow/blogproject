'use strict';
var mongoose = require('mongoose');

var SubCommentSchema = new mongoose.Schema({
    comment_id : { type: mongoose.Schema.Types.ObjectId, ref: 'CommentSchema', required: [true, 'Comment of reference is required']  },
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', required: [true, 'User of reference is required']  },
    content : { type: String, required: [true, 'Content is required']  }
},
{
    timestamps: true
});


module.exports = mongoose.model('SubComment', SubCommentSchema);



