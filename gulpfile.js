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

gulp.task('test', gulp.series('karma:single-run'));
gulp.task('test:auto', gulp.series('karma:auto-run'));
gulp.task('serve', gulp.series('watch', sassCompile, 'webServer'));
gulp.task('serve:api', gulp.series('api:watch'));
gulp.task('watch', watch);

function watch(done) {
  gulp.watch("src/**/*.scss", sassCompile);
  done();
}

gulp.task('webServer', function() {
  gulp.src('src/app')
      .pipe(webserver({
        port:'3000',
        livereload: {
            enable: true, // need this set to true to enable livereload
            filter: function(fileName) {
                if (fileName.match(/.map$/)) { // exclude all source maps from livereload
                    return false;
                } else {
                    return true;
                }
            }
        },
        open: true
      }));
});

// Compile sass into CSS & auto-inject into browsers
function sassCompile(done) {
  gulp.src(['src/modules/*.scss', 'src/index.scss'])
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest("src/app/"))
  done();
}
