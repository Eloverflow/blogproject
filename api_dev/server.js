'use strict';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var user = require('./routes/user');
var post = require('./routes/post');
var comment = require('./routes/comment');
var subComment = require('./routes/subComment');
var vote = require('./routes/vote');

var config = require('./config/database.js');
var jwt = require('jwt-simple');

var env = require('node-env-file');
try {
    env(__dirname + '/.env');
}
catch (e) {
    // No environment file, you may create one at '/api_dev/.env'
}

var mongoose = require('mongoose');
mongoose.connect(config.database, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});
/*

mongoose.command({getParameter:1, textSearchEnabled: 1});*/



var app = express();
/*
var mailer = require('express-mailer');
mailer.extend(app, {
    from: process.env.email | 'user@gmail.com',
    host: process.env.smtp_server | 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: process.env.smtp_port | 587, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: process.env.email | 'user@gmail.com',
        pass: process.env.pass | 'pass'
    }
});*/

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public asdasd
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../www')));

// passport

/*app.use(passport.initialize());*/


global.getToken = function (headers) {
 if (headers && headers.authorization) {
 var parted = headers.authorization.split(' ');
 if (parted.length === 2) {
 return parted[1];
 } else {
 return null;
 }
 } else {
 return null;
 }
};

global.config = config;
global.jwt = jwt;
global.app = app;



//passport

//Ajout pour supporter le cross-site
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
// Fin Ajout pour supporter le cross-site


//app.use('/api/sendColor', color);
app.use('/', index);
app.use('/api/auth', user);
app.use('/api/post', post);
app.use('/api/comment', comment);
app.use('/api/subComment', subComment);
app.use('/api/vote', vote);
/*
 app.use('/api/cloth/pants', pants);*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;