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
var vote = require('./routes/vote');

var config = require('./config/database.js');


var mongoose = require('mongoose');
mongoose.connect(config.database, function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('connection successful');
    }
});




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public asdasd
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../www')));

// passport

/*app.use(passport.initialize());*/


/*getToken = function (headers) {
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
 };*/



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
app.use('/api/user', user);
app.use('/api/post', post);
app.use('/api/comment', comment);
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