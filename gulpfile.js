var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var autoprefixer = require('gulp-autoprefixer');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();

gulp.task('default', ['css', 'javascript'], function(){
    browserSync.init({
        server: "./docs"
    });

    gulp.watch("docs/js/*.js", ["javascript"]).on('change', browserSync.reload);
    gulp.watch('scss/**/*.scss', ['css']);
    gulp.watch("docs/*.html").on('change', browserSync.reload);
    gulp.watch("./*.html", ["html"]);
});

gulp.task('html', function() {
    return gulp.src('./*.html')
        //.pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('docs'));
});

gulp.task('images', function() {
        gulp.src('img/*')
            .pipe(imagemin())
            .pipe(gulp.dest('docs/img'));
});

gulp.task('javascript', function() {
        gulp.src('docs/js/*.js')
           // .pipe(uglify())
            .pipe(gulp.dest('docs/js/dist'));
});

gulp.task('css', function(){
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(cssnano())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('docs/css'))
        .pipe(browserSync.stream());
});

