// declarations, dependencies
// ----------------------------------------------------------------------------
const fs = require('fs');
const gulp = require('gulp');
const browserify = require('browserify');
const envify = require('envify/custom');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
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
const uglify = require('gulp-uglify-es').default;
// const gbabelify = require('gulp-babel');
const vueify = require('vueify');
const unflowify = require('unflowify');
const aliasify = require('aliasify');

class GulpFrontend {
    constructor(production) {
        this.isProduction = production;
        console.log(this.isProduction);

        this.PUB_LOCATIONS = {
            js: 'public/front/js',
            css: 'public/front/css',
            biblio_css: 'public/front/biblio_css',
            fonts: 'public/front/fonts',
            imgs: 'public/front/imgs',
            views: 'public/front/views',
            thirdparty: 'public/front/3rdparty',
            seo: 'public/front/seo',
        };

        this.FRONT_LOCATIONS = {
            fonts: './front/frontend/fonts',
            imgs: './front/frontend/imgs',
            thirdparty: './front/common/3rdparty',
        };

        this.dependencies = [
            'vue',
            'vuex',
            'vue-router',
            'lodash',
            'moment',
            'fold-to-ascii',
            'highcharts',
            'buefy',
            'superagent',
            'crypto',
            'file-saver',
            // 'vue-grid-layout',
            'vue-select',
            'vuedraggable',
            'vue-social-sharing',
            'vue-wysiwyg',
            'vue2-ace-editor',
            'vue2-dropzone',
        ];

        this.external_dependencies = [
        ];

        this.vendors_css_files = [
            './node_modules/font-awesome/css/font-awesome.css',
            './node_modules/vue2-dropzone/dist/vue2Dropzone.css',
            './node_modules/vue-wysiwyg/dist/vueWysiwyg.css',
        ];

        this.css_files = [
        ];

        this.css_biblio_files = [
            './front/frontend/styles/biblio-base.css',
        ];

        this.scriptsCount = 0;
    }

    bundleApp() {
        this.scriptsCount += 1;
        const appBundler = browserify({
            entries: './front/frontend/main.js',
            extensions: ['.js', '.vue'],
            debug: true,
        });

        const aliases = aliasify.configure({
            replacements: {
                '^moment$': './node_modules/moment/min/moment-with-locales.js',
            },
        });

        this.dependencies.forEach((dep) => {
            appBundler.external(dep);
        });

        this.external_dependencies.forEach((dep) => {
            appBundler.external(dep);
        });

        return appBundler
            .transform(unflowify)
            .transform(envify({
                NODE_ENV: process.env.NODE_ENV || 'development',
            }))
            .transform(vueify)
            .transform('babelify', {
                presets: ['es2015'],
                plugins: ['transform-runtime', 'transform-async-to-generator'],
            })
            .transform(aliases)
            .bundle()
            .pipe(source('bundle.js'))
            .pipe(buffer())
            .pipe(gulpif(this.isProduction, uglify({ mangle: true })))
            .on('error', gutil.log)
            .pipe(gulp.dest(this.PUB_LOCATIONS.js));
    }

    bundleVendors() {
        const aliases = aliasify.configure({
            replacements: {
                '^moment$': './node_modules/moment/min/moment-with-locales.js',
            },
        });

        const bundler = browserify({
            require: this.dependencies,
            debug: true,
        });

        this.external_dependencies.forEach((dep) => {
            bundler.external(dep);
        });

        return bundler.transform(envify({
            NODE_ENV: process.env.NODE_ENV || 'development',
        }))
            .transform(vueify)
            .transform('babelify', {
                presets: ['es2015'],
                plugins: ['transform-runtime', 'transform-async-to-generator'],
            })
            .transform(aliases)
            .bundle()
            .pipe(source('vendors.js'))
            .pipe(buffer())
            .pipe(gulpif(this.isProduction, uglify({ mangle: true })))
            .on('error', gutil.log)
            .pipe(gulp.dest(this.PUB_LOCATIONS.js));
    }

    createExternalVendors() {
        gulp
            .src(this.external_dependencies)
            .pipe(concat('vendors.external.js'))
            .pipe(gulpif(this.isProduction, uglify({ mangle: true })))
            .on('error', gutil.log)
            .pipe(gulp.dest(this.PUB_LOCATIONS.js));
    }

    watch() {
        gulp.watch('./front/{frontend,common}/**/*.{vue,jsx,js}', gulp.series('front-scripts'));
        gulp.watch('./front/{frontend,common}/{styles,style}/**/*.*', gulp.parallel('front-styles', 'front-biblio-styles'));
        gulp.watch('./front/frontend/views/*.*', gulp.series('front-views'));
    }

    createVendorStyles() {
        return gulp
            .src(['./front/frontend/styles/vendors.scss',
                './front/frontend/styles/vendors.less', ...this.vendors_css_files])
            .pipe(plumber())
            .pipe(gulpif('*.less', less()))
            .pipe(gulpif('*.scss', sass()))
            .pipe(concat('vendors.css'))
            .pipe(autoprefixer())
            .pipe(gulpif(this.isProduction, cssmin()))
            .pipe(gulp.dest(this.PUB_LOCATIONS.css));
    }

    createBiblioStyles() {
        return gulp
            .src([...this.css_biblio_files])
            .pipe(plumber())
            .pipe(concat('biblio.css'))
            .pipe(autoprefixer())
            .pipe(gulpif(this.isProduction, cssmin()))
            .pipe(gulp.dest(this.PUB_LOCATIONS.biblio_css));
    }

    createStyles() {
        return gulp
            .src(['./front/frontend/styles/front.less', './front/frontend/styles/front.scss', ...this.css_files])
            .pipe(plumber())
            .pipe(gulpif('*.less', less()))
            .pipe(gulpif('*.scss', sass()))
            .pipe(concat('front.css'))
            .pipe(autoprefixer())
            .pipe(gulpif(this.isProduction, cssmin()))
            .pipe(gulp.dest(this.PUB_LOCATIONS.css));
    }

    copyFonts() {
        const font_awesome = './node_modules/font-awesome/fonts';
        return gulp.src([
            `${font_awesome}/fontawesome-webfont.*`,
            `${font_awesome}/FontAwesome.otf`,
        ])
            .pipe(gulp.dest(this.PUB_LOCATIONS.fonts));
    }

    copyCustomersFont() {
        const interstate = `${this.FRONT_LOCATIONS.fonts}/interstate`;
        return gulp.src([`${interstate}/*`], { base: this.FRONT_LOCATIONS.fonts })
            .pipe(gulp.dest(this.PUB_LOCATIONS.fonts));
    }

    copyViews() {
        return gulp.src([
            './front/frontend/views/front.html',
        ]).pipe(gulp.dest(this.PUB_LOCATIONS.views));
    }

    copy3rdparties() {
        return gulp.src(`${this.FRONT_LOCATIONS.thirdparty}/**/*`).pipe(gulp.dest(this.PUB_LOCATIONS.thirdparty));
    }

    copyImgs() {
        return gulp.src([`${this.FRONT_LOCATIONS.imgs}/**/*`], { base: this.FRONT_LOCATIONS.imgs })
            .pipe(gulp.dest(this.PUB_LOCATIONS.imgs));
    }

    copyRobots() {
        return gulp.src([
            './front/frontend/seo/robots.txt',
        ]).pipe(gulp.dest(this.PUB_LOCATIONS.seo));
    }

    revisionClean(cb) {
        if (!this.isProduction) {
            return cb();
        }

        const manifest_path = `${this.PUB_LOCATIONS.views}/rev-manifest.json`;
        if (!fs.existsSync(manifest_path)) {
            return cb();
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

    revision(cb) {
        if (!this.isProduction) {
            return cb();
        }

        return gulp.src([`${this.PUB_LOCATIONS.css}/**/*.css`, `${this.PUB_LOCATIONS.js}/**/*.js`])
            .pipe(revision())
            .pipe(gulpif('*.css', gulp.dest(this.PUB_LOCATIONS.css)))
            .pipe(gulpif('*.js', gulp.dest(this.PUB_LOCATIONS.js)))
            .pipe(revision.manifest())
            .pipe(gulp.dest(this.PUB_LOCATIONS.views));
    }

    revisionReplace(cb) {
        if (!this.isProduction) {
            return cb();
        }

        const manifest_path = `${this.PUB_LOCATIONS.views}/rev-manifest.json`;
        if (!fs.existsSync(manifest_path)) {
            console.error("no manifest");
            return cb();
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

        return gulp.src(`${this.PUB_LOCATIONS.views}/front.html`)
            .pipe(htmlreplace({ css, js }))
            .pipe(gulp.dest(this.PUB_LOCATIONS.views));
    }

    gzip(cb) {
        if (!this.isProduction) {
            return cb();
        }
        return gulp.src([`${this.PUB_LOCATIONS.css}/**/*.css`,
            `${this.PUB_LOCATIONS.js}/**/*.js`, `${this.PUB_LOCATIONS.fonts}/**/*.{woff,woff2,eot,ttf,svg}`])
            .pipe(gzip())
            .pipe(gulpif('*.css.gz', gulp.dest(this.PUB_LOCATIONS.css)))
            .pipe(gulpif('*.js.gz', gulp.dest(this.PUB_LOCATIONS.js)))
            .pipe(gulp.dest(this.PUB_LOCATIONS.fonts));
    }
}

module.exports = GulpFrontend;
