/*
=== Init
 */
var gulp = require('gulp');

// plugins
var jshint = require('gulp-jshint'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-cssmin')
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

/*
=== JavaScript
 */

// Linting in the console!
gulp.task('lint', function(){
    return gulp.src('build/js/pagination.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Build JS
gulp.task('scripts', function(){
    return gulp.src([
        'build/js/pagination.js' ])
        .pipe(concat('jquery.pagination.js'))
        .pipe(gulp.dest('dist/src'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('dist'));
});

/*
=== Stylesheets
 */

// Build CSS
gulp.task('styles', function(){
    return gulp.src('build/css/pagination.scss')
        .pipe(sass())
        .pipe(prefix('last 3 versions'))
        .pipe(gulp.dest('dist/src'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist'));
});

/*
=== Combo Tasks
 */

// Build task - minify and concat all the things!
gulp.task('build', ['styles', 'scripts']);

// Watch files for changes
gulp.task('watch', function(){
    gulp.watch('build/js/*.js', ['scripts']);
    gulp.watch('build/css/*.scss', ['styles']);
});

// Default task
gulp.task('default', ['build', 'watch']);