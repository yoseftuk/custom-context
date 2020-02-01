const gulp = require('gulp');
const uglify = require('gulp-uglify-es').default;
const concat = require('gulp-concat');
const babel = require("gulp-babel");
const sass = require("gulp-sass");

gulp.task('concatjs', () => (
    gulp.src('src/*.js')
        .pipe(concat('custom-context.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
));
gulp.task('docsjs', () => (
    gulp.src('dist/src/*.js')
        .pipe(concat('main.js'))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulp.dest('docs/dist'))
));
gulp.task('docssass', () => (
    gulp.src('docs/src/scss/index.scss')
        .pipe(sass())
        .pipe(gulp.dest('docs/dist'))
));

gulp.task('default', gulp.series([
    'concatjs'
]));

gulp.task('watch', () => {
    gulp.watch('src/*.js', gulp.series(['concatjs']));
    gulp.watch('docs/src/js/*.js', gulp.series(['docsjs']));
    gulp.watch('docs/src/scss/*.scss', gulp.series(['docssass']));
});
