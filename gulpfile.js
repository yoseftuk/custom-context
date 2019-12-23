const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const babel = require("gulp-babel");

gulp.task('concatjs', () => (
    gulp.src('demo/js/*.js')
        .pipe(concat('custom-context.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
));

gulp.task('default', gulp.series([
    'concatjs'
]));

gulp.task('watch', () => {
    gulp.watch('demo/js/*.js', gulp.series(['concatjs']));
});
