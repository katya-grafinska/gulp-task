var gulp = require('gulp');
var sass = require('gulp-sass');//compile scscc to css
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();
var mainBowerFiles = require('main-bower-files');
var gconcat = require('gulp-concat');
var uglify = require('gulp-uglify');//minify js
var filter = require('gulp-filter');
var gulpIf = require('gulp-if');
var htmlmin = require('gulp-htmlmin');
var cssnano = require('gulp-cssnano');//minify css
var imagemin = require('gulp-imagemin'); //optimizing images
var cache = require('gulp-cache');
var del = require('del');//delete files
var runSequence = require('run-sequence');//run tasks in sequence
var deploy = require('gulp-gh-pages');

//Development Tasks
//------------------

gulp.task('browserSync', ['styles', 'html', 'images', 'scripts', 'fonts'], function(){
  browserSync.init({
    server: {
      baseDir: './dist'
    },
  })
});

gulp.task('sass', function(){
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
    	stream: true
    }))
});

gulp.task('html', function() {
   return gulp.src('app/**/*.html')
       .pipe(htmlmin({collapseWhitespace: true}))
       .pipe(gulp.dest('dist'))
});

gulp.task('styles', ['sass'], function() {
  return gulp.src('app/css/*.css')
    .pipe(autoprefixer())
    .pipe(gconcat('main.css'))
    .pipe(cssnano()) // Minifies CSS file
    .pipe(gulp.dest('dist/css'))
})

gulp.task('scripts', function(){
  return gulp.src(mainBowerFiles().concat(['app/js/*']))
    .pipe(filter('**/*.js'))
    .pipe(gconcat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
})

gulp.task('images', function(){
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
  .pipe(cache(imagemin()))
  .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'))
});

gulp.task('deploy', function () {
  return gulp.src("./dist/**/*")
    .pipe(deploy())
});

// Clean
// -----

//Cleaning production folder
gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Clean all, including image cache
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('watch', ['browserSync'], function(){
   gulp.watch('app/scss/**/*.scss', ['bsync:styles']);
   gulp.watch('app/**/*.html', ['bsync:html']);
   gulp.watch('app/js/**/*', ['bsync:scripts']);
});

gulp.task('bsync:styles', ['styles'], function(){
   browserSync.reload();
});

gulp.task('bsync:html', ['html'], function(){
   browserSync.reload();
});

gulp.task('bsync:scripts', ['scripts'], function(){
   browserSync.reload();
});

// Build Sequences
// ---------------

gulp.task('default', function (callback) {
  runSequence('clean:dist', ['watch'], callback)
});