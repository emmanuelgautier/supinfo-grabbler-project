// FOUNDATION FOR APPS TEMPLATE GULPFILE
// -------------------------------------
// This file processes all of the assets in the "client" folder, combines them with the Foundation
// for Apps assets, and outputs the finished files in the "build" folder as a finished app.

// 1. LIBRARIES
// - - - - - - - - - - - - - - -

var gulp       = require('gulp'),
    $          = require('gulp-load-plugins')(),
    rimraf     = require('gulp-rimraf'),
    sequence   = require('run-sequence'),
    path       = require('path'),
    router     = require('./bower_components/foundation-apps/bin/gulp-dynamic-routing');

// 2. SETTINGS VARIABLES
// - - - - - - - - - - - - - - -

// Sass will check these folders for files when you use @import.
var sassPaths = [
  'public/assets/scss',
  'bower_components/foundation-apps/scss'
];

// These files include Foundation for Apps and its dependencies
var foundationJS = [
  'bower_components/fastclick/lib/fastclick.js',
  'bower_components/viewport-units-buggyfill/viewport-units-buggyfill.js',
  'bower_components/tether/tether.js',
  'bower_components/foundation-apps/js/angular/**/*.js',
  '!bower_components/foundation-apps/js/angular/app.js'
];

var angularJS = [
  'bower_components/angular/angular.js',
  'bower_components/angular-animate/angular-animate.js',
  'bower_components/angular-mocks/angular-mocks.js',
  'bower_components/angular-resource/angular-resource.js',
  'bower_components/angular-route/angular-route.js',
  'bower_components/angular-ui-router/release/angular-ui-router.js',
];

// These files are for your app's JavaScript
var appJS = [
  'public/assets/js/app.js'
];

// 3. TASKS
// - - - - - - - - - - - - - - -

// Cleans the build directory
gulp.task('clean', function() {
  return gulp.src(['./public/{components,css,js,templates}'], { read: false })
    .pipe(rimraf({ force: true }));
});

// Copies user-created files and Foundation assets
gulp.task('copy', function() {
  // Fontawesome
  gulp.src(['./bower_components/fontawesome/fonts/*'])
    .pipe(gulp.dest('./public/fonts/'));

  // jQuery
  gulp.src(['./bower_components/jquery/dist/jquery.min.{map,js}'])
    .pipe(gulp.dest('./public/js/lib/'));

  // Modernizr
  gulp.src(['./bower_components/modernizr/modernizr.js'])
    .pipe(gulp.dest('./public/js/lib/'));

  // Require.js
  gulp.src(['./bower_components/requirejs/require.js'])
    .pipe(gulp.dest('./public/js/lib/'));

  // Foundation's Angular partials
  gulp.src(['./bower_components/foundation-apps/js/angular/components/**/*.html'])
    .pipe(gulp.dest('./public/components/'));

  // App
  gulp.src(['./public/assets/js/**/*.js', '!./public/assets/js/main.js'])
    .pipe(gulp.dest('./public/js/app/'));

  // App main
  return gulp.src(['./public/assets/js/main.js'])
    .pipe(gulp.dest('./public/js/'));;
});

// Compiles Sass
gulp.task('sass', function() {
  return gulp.src('./public/assets/scss/app.scss')
    .pipe($.rubySass({
      loadPath: sassPaths,
      style: 'nested',
      bundleExec: true
    })).on('error', function(e) {
      console.log(e);
    })
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie 10']
    }))
    .pipe(gulp.dest('./public/css/'));
});

// Compiles and copies the Foundation for Apps JavaScript, as well as your app's custom JS
gulp.task('uglify', function() {
  // Foundation JavaScript
  gulp.src(foundationJS)
    .pipe($.uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe($.concat('foundation.js'))
    .pipe(gulp.dest('./public/js/lib/'))
  ;

  // Angular JavaScript
  gulp.src(angularJS)
    .pipe($.uglify({
      beautify: true,
      mangle: false
    }).on('error', function(e) {
      console.log(e);
    }))
    .pipe($.concat('angular.js'))
    .pipe(gulp.dest('./public/js/lib/'))
  ;

  // App JavaScript
  return gulp.src(appJS)
    .pipe(gulp.dest('./public/js/app/'))
  ;
});

// generates URLs for page templates
gulp.task('route-templates', ['copy'], function() {
  return gulp.src('./public/assets/templates/**/*.html')
    .pipe(router({
      path: './public/js/app/routes.js',
      root: 'public/assets'
    }))
    .pipe(gulp.dest('./public/templates'))
  ;
});

// Builds your entire app once, without starting a server
gulp.task('build', function(callback) {
  sequence('clean', ['copy', 'sass', 'uglify', 'route-templates'], callback);
});

gulp.task('watch', function() {
  // Watch Sass
  gulp.watch(['./public/assets/scss/**/*'], ['sass']);

  // Watch JavaScript
  gulp.watch(['./public/assets/js/**/*'], ['uglify']);

  // Watch app templates
  gulp.watch(['./public/assets/templates/**/*.html'], ['route-templates']);

  // Watch static files
  gulp.watch(['./public/assets/**/*.*', '!./public/assets/templates/**/*.*', '!./public/assets/{scss}/**/*.*'], ['copy']);
});

// Default task: builds your app and recompiles assets when they change
gulp.task('default', function() {
  sequence('build', 'watch');
});
