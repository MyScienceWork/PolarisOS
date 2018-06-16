// const Handlebars = require('handlebars');
// const MomentHandler = require('handlebars.moment');
//
// MomentHandler.registerHelpers(Handlebars);
//
// console.log(Handlebars.compile('{{moment utc=true}}')({}));
//
const PDFMerge = require('pdf-merge');

const files = [
    `${__dirname}/1.pdf`,
    `${__dirname}/2.pdf`,
];

// Save as new file
PDFMerge(files, { output: `${__dirname}/3.pdf` })
.then((buffer) => {});
