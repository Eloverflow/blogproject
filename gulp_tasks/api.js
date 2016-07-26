const gulp = require('gulp');

sh = require('shelljs');
//const apiConf = require('../conf/api.conf');
//const apiDistConf = require('../conf/api-dist.conf');

gulp.task('api:watch', done => {
  sh.exec('supervisor --debug=8000  -pid ./api_dev/bin/pid/app.pid -w ./api_dev/server.js,./api_dev/bin/www,./api_dev/api/models,./api_dev/routes,./api_dev/config,./api_dev/views ./api_dev/bin/www 1> ./api_dev/bin/log/app.log 2> /api_dev/bin/log/app.log');
});

