'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Post = require('../models/post.js');
var User = require('../models/user.js');
var passport = require('passport');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

require('../config/passport')(passport);

router.post('/signup', function(req, res, next) {
    if (!req.body.email || !req.body.password) {
        res.json({success: false, msg: 'Please pass email and password.'});
    } else {
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
                name: req.body.name,
                password: 'facebookUser'
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
                res.json({success: true, user: user, token: token, msg: 'Successfully changed password'});
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

router.get('/resetPwd/:email', function(req, res, next) {
  // create reusable transporter object using the default SMTP transport

    var smtpConfig = {
        host:  process.env.smtp_server | 'smtp.gmail.com',
        port: process.env.smtp_port | 465,
        secureConnection: true,
        auth: {
            user: process.env.email | 'user@gmail.com',
            pass:  process.env.pass | 'pass'
        },
        tls:{
            secureProtocol: "TLSv1_method"
        }
    };

  var transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function(error, success) {
    if (error) {
        console.log('Server is failed to test transporter');
        console.log(error);
    } else {
        console.log('Server is ready to take our messages');
    }
});

    //smtps://' + process.env.email +':'+ process.env.pass + '@'+ process.env.SMTPServer);

// setup e-mail data with unicode symbols
  var mailOptions = {
    from: process.env.email | 'user@gmail.com', // sender address
    to: req.params.email, // list of receivers
    subject: 'Hello it seems you lost your password ?', // Subject line
    text: 'Hello world 🐴', // plaintext body
    html: '<b>Hello world 🐴</b>' // html body
  };


// send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
    if(error){
      res.send(error);
    }
    else{
        res.send('Message sent')

    }

      transporter.close();
  });
});


module.exports = router;


