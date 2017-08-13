var gulp           = require('gulp'),
    autoprefixer   = require('gulp-autoprefixer'),
    minifycss      = require('gulp-uglifycss'),
    uglify         = require('gulp-uglify'),
    rename         = require('gulp-rename'),
    sass           = require('gulp-sass'),
    plumber        = require('gulp-plumber'),
    notify         = require('gulp-notify'),
    streamqueue    = require('streamqueue'),
    sourcemaps     = require('gulp-sourcemaps'),
    gulpif         = require('gulp-if'),
    concat         = require('gulp-concat'),
    babel          = require('gulp-babel'),


    productionMode = false;


gulp.task('default', ['watch']);


gulp.task('styles', function () {

    gulp.task('styles', function () {
        return gulp.src('./src/css/style.scss')
            .pipe(plumber({
                errorHandler: notify.onError("Error: <%= error.message %>")
            }))
            .pipe(sourcemaps.init())
            .pipe(sass())
            .pipe(gulpif(productionMode, autoprefixer({
                browsers: ['last 5 versions'],
                cascade: false
            })))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulpif(productionMode, minifycss()))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest('./build/css'))
            .pipe(notify("Styles task complete"));
    });

});

gulp.task('vendorsJs', function() {
    return streamqueue({ objectMode: true },
        gulp.src('./src/js/vendor/vue.js'),
        gulp.src('./src/js/vendor/vue-multiselect.min.js'),
        // gulp.src('./src/js/vendor/lodash.min.js'),
        gulp.src('./src/js/vendor/jquery-3.2.1.min.js'),
        gulp.src('./src/js/vendor/vue-paginate.min.js')


    )

        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('vendors.js'))
        .pipe(gulpif(productionMode, uglify()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./build/js'))
        .pipe(notify("Vendor script task complete"));
});


gulp.task('scriptsJs', function() {
    return streamqueue({ objectMode: true },
        gulp.src('./src/js/custom/custom.es6')
    )

        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(concat('custom.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulpif(productionMode, uglify()))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./build/js'))
        .pipe(notify("Custom script task complete"))
});


gulp.task('watch', ['styles', 'vendorsJs', 'scriptsJs'], function() {
    gulp.watch('src/css/**/*.scss', ['styles']);
    gulp.watch('src/js/vendor/*.js', ['vendorJs']);
    gulp.watch('src/js/custom/*.js', ['scriptsJs']);
    gulp.watch('src/js/custom/*.es6', ['scriptsJs']);
});