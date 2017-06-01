var gulp = require('gulp'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    gulpSequence = require('gulp-sequence').use(gulp),
    plumber = require('gulp-plumber'),
    vendorPaths = [
        'assets/scripts/vendor/jQuery/jquery-1.11.0.min.js',
        'assets/scripts/vendor/jQuery/jquery-migrate-1.2.1.min.js',
        'assets/scripts/vendor/slick/slick.min.js',
        'assets/scripts/vendor/inputmask/jquery.inputmask.js',
        'assets/scripts/vendor/validate/jquery.validate.min.js'
    ];

/* BROWSER */
gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: "./"
        },
        options: {
            reloadDelay: 250
        },
        notify: false
    });
});

/* IMAGES */
gulp.task('images', function(tmp) {
    gulp.src(['assets/images/*'])
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true }))
        .pipe(gulp.dest('assets/images'));
});

gulp.task('images-dist', function() {
    gulp.src(['assets/images/*'])
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/images'));
});

/* JAVASCRIPT */
gulp.task('scripts', function() {
    return gulp.src(['assets/scripts/*.js', '!assets/scripts/vendor'])
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts-dist', function() {
    return gulp.src(['assets/scripts/*.js', '!assets/scripts/vendor'])
        .pipe(plumber())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

gulp.task('vendor', function() {
    return gulp.src(vendorPaths)
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .on('error', gutil.log)
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('vendor-dist', function() {
    return gulp.src(vendorPaths)
        .pipe(plumber())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist'));
});

/* CSS */
gulp.task('styles', function() {
    return gulp.src(['assets/styles/**/*.css', 'assets/styles/*'])
        .pipe(plumber())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('styles-dist', function() {
    return gulp.src(['assets/styles/**/*.css', 'assets/styles/*'])
        .pipe(plumber())
        .pipe(concat('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts-dist', function() {
    return gulp.src('assets/fonts/**/*')
        .pipe(plumber())
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('html', function() {
    return gulp.src('./*.html')
        .pipe(plumber())
        .pipe(browserSync.reload({ stream: true }))
        .on('error', gutil.log);
});

gulp.task('html-dist', function() {
    gulp.src('./*.html')
        .pipe(plumber())
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('default', ['browserSync', 'scripts', 'vendor', 'styles'], function() {
    gulp.watch('assets/scripts/*.js', ['scripts']);
    gulp.watch('assets/scripts/vendor/**/*.js', ['vendor']);
    gulp.watch('assets/styles/**/*.css', ['assets/styles/*'], ['styles']);
    gulp.watch('assets/images/*', ['images']);
    gulp.watch('./*.html', ['html']);
});

gulp.task('dist', gulpSequence('clean', ['scripts-dist', 'vendor-dist', 'styles-dist', 'fonts-dist', 'images-dist'], 'html-dist'));