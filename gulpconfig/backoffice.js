// declarations, dependencies
// ----------------------------------------------------------------------------
const fs = require('fs');
const gulp = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const gulpif = require('gulp-if');
const autoprefixer = require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const less = require('gulp-less');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const concat = require('gulp-concat');
const revision = require('gulp-rev');
const gzip = require('gulp-gzip');
const htmlreplace = require('gulp-html-replace');
const clean = require('gulp-clean');
const uglify = require('gulp-uglify');

class GulpBackoffice {
    constructor(production) {
        this.isProduction = production;
        this.PUB_LOCATIONS = {
            global: 'public/back',
            js: 'public/back/js',
            css: 'public/back/css',
            fonts: 'public/back/fonts',
            imgs: 'public/back/imgs',
            views: 'public/back/views',
        };

        this.dependencies = [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-bootstrap',
            'prop-types',
            'lodash',
            'moment',
        ];

        this.external_dependencies = [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js',
            './node_modules/toastr/toastr.js',
        ];

        this.vendors_css_files = [
            './node_modules/font-awesome/css/font-awesome.css',
            './node_modules/react-select/dist/react-select.css',
        ];

        this.css_files = [
        ];
    }

    bundleApp() {
        const appBundler = browserify({
            entries: './front/backoffice/main.jsx',
            extensions: ['.js', '.jsx'],
            debug: true,
        });

        this.dependencies.forEach((dep) => {
            appBundler.external(dep);
        });

        return appBundler
        .transform('babelify', {
            presets: ['es2015', 'react'],
            plugins: ['transform-runtime', 'transform-async-to-generator'],
        })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        // .pipe(gulpif(this.isProduction, uglify({ mangle: true })))
        .pipe(gulp.dest(this.PUB_LOCATIONS.js));
    }

    bundleVendors() {
        return browserify({
            require: this.dependencies,
            debug: true,
        })
        .transform('babelify', {
            presets: ['es2015', 'react'],
            plugins: ['transform-runtime', 'transform-async-to-generator'],
        })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('vendors.js'))
        // .pipe(gulpif(this.isProduction, uglify({ mangle: true })))
        .pipe(gulp.dest(this.PUB_LOCATIONS.js));
    }

    createExternalVendors() {
        gulp
        .src(this.external_dependencies)
        .pipe(concat('vendors.external.js'))
        // .pipe(gulpif(this.isProduction, uglify({ mangle: true })))
        .pipe(gulp.dest(this.PUB_LOCATIONS.js));
    }

    watch() {
        gulp.watch(['./front/backoffice/**/*.{js,jsx}'], ['back-scripts']);
        gulp.watch(['./front/backoffice/styles/**/*.*'], ['back-styles']);
        gulp.watch(['./front/backoffice/views/*.*'], ['back-views']);
    }

    createVendorStyles() {
        gulp
        .src(['./front/backoffice/styles/vendors.scss', './front/backoffice/styles/vendors.less', ...this.vendors_css_files])
        .pipe(plumber())
        .pipe(gulpif('*.less', less()))
        .pipe(gulpif('*.scss', sass()))
        .pipe(concat('vendors.css'))
        .pipe(autoprefixer())
        .pipe(gulpif(this.isProduction, cssmin()))
        .pipe(gulp.dest(this.PUB_LOCATIONS.css));
    }

    createStyles() {
        gulp
        .src(['./front/backoffice/styles/admin.less', ...this.css_files])
        .pipe(plumber())
        .pipe(gulpif('*.less', less()))
        .pipe(gulpif('*.scss', sass()))
        .pipe(concat('admin.css'))
        .pipe(autoprefixer())
        .pipe(gulpif(this.isProduction, cssmin()))
        .pipe(gulp.dest(this.PUB_LOCATIONS.css));
    }

    copyFonts() {
        const font_awesome = './node_modules/font-awesome/fonts';
        const font_glyphicon = './node_modules/bootstrap-sass/assets/fonts/bootstrap';
        const font_ionicon = './node_modules/ionicons/dist/fonts';
            // var font_roboto    = 'bower_components/materialize/font';
            // var font_interstate = '3rdparty/fonts_interstate';
        return gulp.src([
            `${font_awesome}/fontawesome-webfont.*`,
            `${font_awesome}/FontAwesome.otf`,
            `${font_glyphicon}/glyphicons-halflings-regular.*`,
            `${font_ionicon}/ionicons.*`,
            // `${font_roboto}/material-design-icons/Material-Design-Icons.*`,
            // `${font_roboto}/roboto/Roboto-*`,
            //`${font_interstate}/Interstate-B*Condensed.*`,
        ]).pipe(gulp.dest(this.PUB_LOCATIONS.fonts));
    }

    copyViews() {
        gulp.src([
            './front/backoffice/views/admin.html',
        ]).pipe(gulp.dest(this.PUB_LOCATIONS.views));
    }

    revisionClean() {
        if (!this.isProduction) {
            return null;
        }

        const manifest_path = `${this.PUB_LOCATIONS.views}/rev-manifest.json`;
        if (!fs.existsSync(manifest_path)) {
            return null;
        }

        const manifest = JSON.parse(fs.readFileSync(manifest_path));
        const css = Object.values(manifest)
            .filter(val => val.indexOf('.css') !== -1)
            .map(val => `${this.PUB_LOCATIONS.css}/${val}`);
        const js = Object.values(manifest)
            .filter(val => val.indexOf('.js') !== -1)
            .map(val => `${this.PUB_LOCATIONS.js}/${val}`);

        return gulp.src([...js, ...css])
            .pipe(clean());
    }

    revision() {
        if (!this.isProduction) {
            return null;
        }
        return gulp.src([`${this.PUB_LOCATIONS.css}/**/*.css`, `${this.PUB_LOCATIONS.js}/**/*.js`])
            .pipe(revision())
            .pipe(gulpif('*.css', gulp.dest(this.PUB_LOCATIONS.css)))
            .pipe(gulpif('*.js', gulp.dest(this.PUB_LOCATIONS.js)))
            .pipe(revision.manifest())
            .pipe(gulp.dest(this.PUB_LOCATIONS.views));
    }

    revisionReplace() {
        if (!this.isProduction) {
            return null;
        }

        const manifest_path = `${this.PUB_LOCATIONS.views}/rev-manifest.json`;
        if (!fs.existsSync(manifest_path)) {
            return null;
        }

        const manifest = JSON.parse(fs.readFileSync(manifest_path));
        const css = Object.values(manifest)
            .filter(val => val.indexOf('.css') !== -1)
            .map(val => `/${this.PUB_LOCATIONS.css}/${val}`);
        const js = Object.values(manifest)
            .filter(val => val.indexOf('.js') !== -1)
            .map(val => `/${this.PUB_LOCATIONS.js}/${val}`);

        css.sort();
        css.reverse();
        js.sort();
        js.reverse();

        return gulp.src(`${this.PUB_LOCATIONS.views}/admin.html`)
        .pipe(htmlreplace({ css, js }))
        .pipe(gulp.dest(this.PUB_LOCATIONS.views));
    }

    gzip() {
        if (!this.isProduction) {
            return null;
        }
        return gulp.src([`${this.PUB_LOCATIONS.css}/**/*.css`,
            `${this.PUB_LOCATIONS.js}/**/*.js`, `${this.PUB_LOCATIONS.fonts}/**/*.{woff,woff2,eot,ttf,svg}`])
            .pipe(gzip())
            .pipe(gulpif('*.css.gz', gulp.dest(this.PUB_LOCATIONS.css)))
            .pipe(gulpif('*.js.gz', gulp.dest(this.PUB_LOCATIONS.js)))
            .pipe(gulp.dest(this.PUB_LOCATIONS.fonts));
    }

}

module.exports = GulpBackoffice;
