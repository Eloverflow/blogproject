'use strict';

var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    name : { type: String, required: false },
    password : { type: String, required: true },
    email : { type: String, required: true},
    picture: { type: String, required: false },
    is_admin : { type: Boolean, required: false, default: false}
},
{
    timestamps: true
});


UserSchema.pre('save',function(next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
      //  bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
           // bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
          //  });
       // });
    } else {
        return next();
    }
});



UserSchema.methods.comparePassword = function (passw, cb) {
   // bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
   // });
};

module.exports = mongoose.model('User', UserSchema);


