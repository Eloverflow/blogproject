'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');
var User = require('../models/user.js');
var passport = require('passport');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var crypto = require('crypto');

require('../config/passport')(passport);

router.post('/signup', function(req, res, next) {
    //If there is no email or no password or the email is invalid or the password is invalid
    if (!req.body.email) {
        res.json({success: false, msg: 'Please pass an email'});
    } else if(!req.body.password){
        res.json({success: false, msg: 'Please pass a password'});
    } else if(!(req.body.email).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm)){
        res.json({success: false, msg: 'Please pass a valid email'});
    } else if(!(req.body.password).match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)){
        res.json({success: false, msg: 'Please pass a valid password', requirements: [
            'should contain at least one digit',
            'should contain at least one lower case',
            'should contain at least one upper case',
            'should contain at least 8 from the mentioned characters'
        ]});
    }
    else {
        var newUser = new User({
            email: req.body.email,
            username: req.body.username,
            is_admin: req.body.is_admin,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Username already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
});

router.post('/authenticate', function(req, res, next) {

    /*Allow to authenticate with username and email*/
    var userObject = {};
    if((req.body.email).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm))
        userObject.email = req.body.email;
    else
        userObject.username = req.body.email;

  User.findOne(userObject, function(err, user) {
    if (err) throw err;

    if (!user) {
      return res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, using_email: userObject.email ? true : false, user: user, msg: 'Authentication success.', token: 'JWT ' + token });
        } else {
          return res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

/* POST /facebook */
router.post('/facebook', function(req, res, next) {

    User.findOne({
        email: req.body.email
    },function (err, user) {
        if (err) return next(err);
        if(user == null){
            User.create({
                picture: req.body.picture,
                email: req.body.email,
                facebook_id: req.body.userID,
                name: req.body.name
            }, function (err, user) {
                if (err) return next(err);
                user.save(function(err) {
                    if (err) {
                        return res.json({success: false, msg: 'Username already exists.'});
                    }
                    var token = jwt.encode(user, config.secret);
                    res.json({success: true, using_facebook: true, user: user, msg: 'Account Created - Authentication success.', token: 'JWT ' + token });
                });

            });

        }
        else {
            var token = jwt.encode(user, config.secret);
            res.json({success: true, using_facebook: true, user: user, msg: 'Authentication success.', token: 'JWT ' + token });
        }



    })


});

router.get('/memberinfo', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      email: decoded.email
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        res.json({success: true, msg: 'Welcome in the member area ' + user.name + '!', user: user});
      }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

router.put('/changePwd', function(req, res, next) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, config.secret);
        User.findOne({
            email: decoded.email
        },function (err, user) {
            if (err) return next(err);

            user.password = req.body.password;

            user.save(function(err) {
                if (err) {
                    return res.json({success: false, msg: 'Validation failed on save'});
                }

                token = jwt.encode(user, config.secret);
                res.json({success: true, user: user,  token: 'JWT ' + token, msg: 'Successfully changed password'});
            });


        })
    }

});

router.put('/changePict/:id', function(req, res, next) {
 User.findById(req.params.id, function (err, post) {

    post.picture = req.body.picture;

    post.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }

      res.json({success: true});
    });

    if (err) return next(err);
  });

});

/* GET /posts of user */
router.get('/:id/posts', function(req, res, next) {
    Post.find({user_id: req.params.id}).exec(function (err, posts) {
        if (err) return next(err);
        res.json(posts);
    });
});

router.post('/newPwd/:token', function(req, res, next) {

    User.findOne({ reset_token: req.params.token, reset_token_expire: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            return res.send({success: false, msg:'Password reset token is invalid or has expired.'});
        }
        user.password = req.body.password;
        user.reset_token = undefined;
        user.reset_token_expire = undefined;

        user.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'User failed at saving changed'});
            }

            res.send({success: true, msg: 'Password successfully changed !'});
        });
    });
});

router.get('/resetPwd/:email', function(req, res, next) {

    User.findOne({email: req.params.email}, function (err, user) {
        if (err) return next(err);

        if(user != null){
            crypto.randomBytes(20, function(err, buf) {
                user.reset_token = buf.toString('hex');
                user.reset_token_expire = Date.now() + 3600000;
                user.save();

                var transporter = nodemailer.createTransport(config.smtpConfig);

                var link = config.network.address + ':3000' + '/#!/new-password/' + user.reset_token;

                var mailOptions = {
                    from: process.env.from_email || 'user@gmail.com', // sender address
                    to: req.params.email, // list of receivers
                    subject: 'Hello it seems you lost your password ?', // Subject line
                    text: 'Click on the link :  ' + link +
                    '\n To type your new password!', // plaintext body
                    html: '<b>'+ 'Click on the link :' +'</b> <a href="' + link + '">'+ link + '</a><br>To type your new password!' // html body
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        res.send({success: false, msg: error});
                    }
                    else{
                        res.send({success: true, msg: 'Message sent'})

                    }

                    transporter.close();
                });


            });

        }
        else{
            res.send({success: false, msg: 'Invalid email'});
        }


    });



});


module.exports = router;


