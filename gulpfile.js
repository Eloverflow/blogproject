const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
const browserSync = require('browser-sync');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');

const conf = require('./conf/gulp.conf');

// Load some files into the registry
const hub = new HubRegistry([conf.path.tasks('*.js')]);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('build', gulp.series('partials', gulp.parallel('other', 'webpack:dist')));
gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('watch', 'browsersync', sassCompile, 'webServer'));
//gulp.task('serve', gulp.series('webpack:watch', 'watch', 'browsersync', sassCompile));
gulp.task('serve:api', gulp.series('api:watch'));
gulp.task('serve:dist', gulp.series('default', 'browsersync:dist'));
gulp.task('default', gulp.series('clean', 'build'));
gulp.task('watch', watch);

function reloadBrowserSync(cb) {
  browserSync.reload();
  cb();
}

function watch(done) {
  gulp.watch(conf.path.src('app/**/*.html'), reloadBrowserSync);
  gulp.watch("src/**/*.scss", sassCompile);
  done();
}

gulp.task('webServer', function() {
  gulp.src('src/app')
      .pipe(webserver({
        port:'3000',
        livereload: true,
        open: true
      }));
});



// Compile sass into CSS & auto-inject into browsers
/*function sassCompile(done) {
  gulp.src("src/!**!/!*.scss")
      .pipe(sass())
      .pipe(gulp.dest("src/"))
      .pipe(browserSync.stream());
  done();
};*/

// Compile sass into CSS & auto-inject into browsers
function sassCompile(done) {
  gulp.src('src/**/*.scss')
      .pipe(sass())
      .pipe(gulp.dest('src/tmp'))
      .pipe(concat('index.css'))
      .pipe(autoprefixer())
      .pipe(gulp.dest("src/app/"))
      .pipe(browserSync.stream());
  done();
}


/*

gulp.task('sass-watch', function() {
});*/
