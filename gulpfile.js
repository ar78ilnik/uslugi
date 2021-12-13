
'use strict';

/* подключаем плагины */
const gulp = require('gulp');
const scss = require('gulp-sass')(require('sass'));
const fileInclude = require('gulp-file-include');
const debug = require('gulp-debug');
const bs = require('browser-sync').create();
const plumber = require('gulp-plumber');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const postcss = require('postcss');
//const imagemin = require('gulp-image');
//const avif = require('gulp-avif');
//const webp = require('gulp-webp');
const svgstore = require('gulp-svgstore');
const del = require('del');

function clean() {
    return del('dist');
};

function html() {
    return gulp.src('app/*.html')
        .pipe(fileInclude())
        .pipe(gulp.dest('dist'))
        .pipe(debug({
            title: 'Html'
        }));
};

function images() {
    return gulp.src('app/img/**/*.{jpg,png}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
}

function toWebp() {
    return gulp.src('app/img/**/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'))
        .pipe(debug({
            title: 'toWebp'
        }));
}

function toAvif() {
    return gulp.src('app/img/**/*.{jpg, png}')
        .pipe(avif({
            quality: 50
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(debug({
            title: 'toAvif'
        }));
}

function sprite() {
    return gulp.src('app/img/**/*.svg')
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename('sprite.svg'))
        .pipe(gulp.dest('dist/img'));
}

function copy() {
    return gulp.src([
            'app/fonts/**/*.*',
            'app/js/**/*.js',
            'app/img/**/*.{jpg,png}'
        ], {
            base: 'app',
        })
        .pipe(gulp.dest('dist'))
        .pipe(debug({
            title: 'copy'
        }));
};

function style() {
    return gulp.src('app/scss/style.scss')
        .pipe(plumber())
        .pipe(debug({
            title: 'src'
        }))
        .pipe(scss())
        .pipe(debug({
            title: 'scss'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(csso())
        .pipe(rename('style.min.css'))
        .pipe(debug({
            title: 'rename'
        }))
        .pipe(gulp.dest('dist/css'))
        .pipe(bs.reload({
            stream: true
        }));
};

function js() {
    return gulp.src('app/js/*.js')
        .pipe(fileInclude())
        .pipe(gulp.dest('dist/js/'))
        .pipe(debug({
            title: 'js'
        }));
};

function watch() {
    gulp.watch('app/**/*.html', html);
    gulp.watch('app/scss/*.scss', style);
    gulp.watch('app/js/**/*.js', js);
    gulp.watch('app/fonts/*.{woff, woff2}', copy);
    //gulp.watch('app/img/**/*.jpg', images);
    gulp.watch('app/img/**/*.svg', sprite);
};

function server() {
    bs.init({
        server: 'dist'
    });
    bs.watch('app/**/*.html').on('change', bs.reload);
    bs.watch('app/scss/*.scss').on('change', bs.reload);
    bs.watch('app/js/**/*.js').on('change', bs.reload);
    bs.watch('app/img/**/*.*').on('change', bs.reload);
};

const build = gulp.series(clean, copy, sprite, style, js, html, gulp.parallel(watch, server));

exports.clean = clean;
exports.html = html;
exports.images = images;
exports.toWebp = toWebp;
exports.toAvif = toAvif;
exports.js = js;
exports.sprite = sprite;
exports.copy = copy;
exports.style = style;
exports.build = build;
exports.watch = watch;
exports.server = server;