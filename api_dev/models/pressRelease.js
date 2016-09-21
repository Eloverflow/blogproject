'use strict';
var mongoose = require('mongoose');

var PressReleaseSchema = new mongoose.Schema({
    title : { type: String, required: [true, 'Title is required'] },
    content : { type: String, required: [true, 'Content is required']},
    user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema', required: [true, 'User of reference is required']  },
    view_count: { type: Number, required: false, default: 0},
    tags: {type: Array, required: false},
},
{
    timestamps: true
});


PressReleaseSchema.index({
    title: 'text',
    content: 'text',
    tags: 'text'
}, {
    name: "posts_match_index",
    weights: {
        title: 1,
        tags: 2
    }
});

module.exports = mongoose.model('PressRelease', PressReleaseSchema);

