const gulp = require('gulp');
const HubRegistry = require('gulp-hub');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');

// Load some files into the registry
const hub = new HubRegistry(['gulp_tasks/*.js']);

// Tell gulp to use the tasks just loaded
gulp.registry(hub);

gulp.task('serve', gulp.series('watch', sassCompile, 'webServer'));
gulp.task('serve:api', gulp.series('api:watch'));
gulp.task('watch', watch);

function watch(done) {
  gulp.watch("src/**/*.scss", sassCompile);
  done();
}

// Compile sass into CSS & auto-inject into browsers
function sassCompile(done) {
  gulp.src(['src/modules/*.scss', 'src/index.scss'])
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(gulp.dest("src/app/"))
  done();
}
