'use strict';
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var user = require('../models/user.js'),
    config = require('./database');

module.exports = {

    'facebookAuth': {
        'clientID': 'your-secret-clientID-here', // your App ID
        'clientSecret': 'your-client-secret-here', // your App Secret
        'callbackURL': 'http://localhost:8080/auth/facebook/callback'
    }
};

module.exports = function(passport) {
    var opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.issuer = "Mirageflow.com";
    opts.audience = "blogproject.mirageflow.com";

    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        user.findOne({id: jwt_payload.id}, function(err, user) {
            if(err) {
                return done(err, false);
            }
            if(user) {
              done(null, user)
            }else{
                done(null, false);
            }
        });
    }));
};
