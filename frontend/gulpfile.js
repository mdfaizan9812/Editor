const gulp = require('gulp'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

gulp.task('css', function(){
    return gulp.src('./public/src/css/*.css')
    .pipe(minify())
    .pipe(gulp.dest('./public/dest/css'))
});

gulp.task('js', function(){
    return gulp.src('./public/src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/dest/js'))
});

gulp.task('images', function(){
    return gulp.src('./public/src/image/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./public/dest/image'))
});

gulp.task('watch', function(){
    gulp.watch('./public/src/css/*.css',gulp.series('css'));
    gulp.watch('./public/src/js/*.js',gulp.series('js'));
    gulp.watch('./public/src/image/*',gulp.series('images'));
})