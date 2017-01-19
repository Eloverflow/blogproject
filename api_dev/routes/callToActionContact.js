'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var nodemailer = require('nodemailer');

var Recaptcha = require('recaptcha-verify');
var recaptcha = new Recaptcha({
  secret: '6LcEmwgUAAAAAEl6A-Hjmn4Ee6CP2TxY5nV3RDoR',
  verbose: true
});

/* POST /post */
router.post('/', function(req, res, next) {

      if (!req.body.callToActionContact) {
        res.status(400).json({success: false, msg: 'No email was found in the contact fields', translate: 'NO-EMAIL-IN-FIELD'});
      } else if(!(req.body.callToActionContact).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/igm)){
        res.status(400).json({success: false, msg: 'Please pass a valid email', translate: 'INVALID-EMAIL-IN-FIELD'});
      } else{
        var transporter = nodemailer.createTransport(config.smtpConfig);


        var mailOptions = {
          from: process.env.from_email || 'user@gmail.com', // sender address
          to: req.body.callToActionContact, // list of receivers
          subject: 'Hello it seems you just contacted us', // Subject line
          text: 'We received your message', // plaintext body
          html: '<b>'+ 'We received your message' +'</b> ' // html body
        };

        var mailAdminOptions = {
          from: process.env.noreply_email || 'noreply@mirageflow.com', // sender address
          to: process.env.from_email, // list of receivers
          subject: 'Hello it seems someone just contacted us', // Subject line
          text: 'Email :' + req.body.callToActionContact +
          '\nHe used the call to action!\n', // plaintext body
          html: '<b>Email :' + req.body.callToActionContact +'</b><br>Message:<br>'+
          'He used the call to action!'// html body
        };

        // send mail with defined transport object
        transporter.sendMail(mailAdminOptions, function(error, info){
          if(error){
            res.json({success: false, msg: 'Unsuccessful sent admin message', translate: 'MAIL-FAILED', info: info});
          }
          else{
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                res.json({success: true, msg: 'Successful sent admin message & Unsuccessful sent contact message', translate: 'MAIL-SUCCESS', info: info});
              }
              else {

                res.json({success: true, msg: 'Successful sent admin message & Successful sent contact message', translate: 'MAIL-SUCCESS2', info: info});
              }
            })
          }

          transporter.close();
        });

      }

});


module.exports = router;

