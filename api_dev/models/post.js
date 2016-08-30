'use strict';
var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title : { type: String, required: true },
    content : { type: String, required: true },
    //  user_id :  { type: mongoose.Schema.Types.ObjectId, ref: 'UserSchema' },
    view_count: { type: Number, required: false, default: 0},
    tags: {type: Array, required: false}
},
{
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);

