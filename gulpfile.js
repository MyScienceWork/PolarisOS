const gulp = require('gulp');
const gulpconfig = require('./gulpconfig');

const production = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'demo';

const back = new gulpconfig.Backoffice(production);
gulp.task('back-scripts', back.bundleApp.bind(back));
gulp.task('back-vendors', back.bundleVendors.bind(back));
gulp.task('back-external-vendors', back.createExternalVendors.bind(back));
gulp.task('back-vendor-styles', back.createVendorStyles.bind(back));
gulp.task('back-styles', back.createStyles.bind(back));
gulp.task('back-fonts', back.copyFonts.bind(back));
gulp.task('back-imgs', back.copyImgs.bind(back));
gulp.task('back-customers-fonts', back.copyCustomersFont.bind(back));
gulp.task('back-views', back.copyViews.bind(back));
gulp.task('back-revision-clean', back.revisionClean.bind(back));
gulp.task('back-revision', ['back-scripts', 'back-vendors', 'back-external-vendors',
    'back-vendor-styles', 'back-styles',
    'back-fonts', 'back-views', 'back-revision-clean'], back.revision.bind(back));
gulp.task('back-revision-replace', ['back-revision'], back.revisionReplace.bind(back));
gulp.task('back-gzip', ['back-revision'], back.gzip.bind(back));
gulp.task('back-watch', back.watch.bind(back));

const front = new gulpconfig.Frontend(production);
gulp.task('front-scripts', front.bundleApp.bind(front));
gulp.task('front-vendors', front.bundleVendors.bind(front));
gulp.task('front-external-vendors', front.createExternalVendors.bind(front));
gulp.task('front-vendor-styles', front.createVendorStyles.bind(front));
gulp.task('front-biblio-styles', front.createBiblioStyles.bind(front));
gulp.task('front-styles', front.createStyles.bind(front));
gulp.task('front-fonts', front.copyFonts.bind(front));
gulp.task('front-imgs', front.copyImgs.bind(front));
gulp.task('front-customers-fonts', front.copyCustomersFont.bind(front));
gulp.task('front-views', front.copyViews.bind(front));
gulp.task('front-revision-clean', front.revisionClean.bind(front));
gulp.task('front-revision', ['front-scripts', 'front-vendors', 'front-external-vendors',
    'front-vendor-styles', 'front-styles', 'front-biblio-styles',
    'front-fonts', 'front-views', 'front-revision-clean'], front.revision.bind(front));
gulp.task('front-revision-replace', ['front-revision'], front.revisionReplace.bind(front));
gulp.task('front-gzip', ['front-revision'], front.gzip.bind(front));
gulp.task('front-watch', front.watch.bind(front));

const backs = ['back-scripts', 'back-vendors', 'back-external-vendors',
    'back-vendor-styles', 'back-styles',
    'back-fonts', 'back-views',
    'back-customers-fonts', 'back-imgs',
    'back-gzip', 'back-revision-clean', 'back-revision',
    'back-revision-replace',
];

const fronts = ['front-scripts', 'front-vendors', 'front-external-vendors',
    'front-vendor-styles', 'front-styles', 'front-biblio-styles',
    'front-fonts', 'front-customers-fonts', 'front-imgs', 'front-views', 'front-gzip', 'front-revision-clean',
    'front-revision', 'front-revision-replace',
];

gulp.task('default', [...fronts, 'front-watch', ...backs, 'back-watch']);
gulp.task('build', [...fronts, ...backs]);
