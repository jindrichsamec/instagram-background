/* global global */

var gulp = require('gulp'),
	typescript = require('gulp-typescript'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify');

var paths = {
	sources: ['src/**/*.ts'],
	tests: ['test/**/*.ts'],
};

gulp.task('build', function() {	
	return gulp.src(paths.sources)
		.pipe(typescript())
		.pipe(concat('angular-instangram-background.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

gulp.task('test', function() {
	
});

gulp.task('watch', function() {
	gulp.watch(paths.sources, ['build']);
});

gulp.task('default', ['watch']);