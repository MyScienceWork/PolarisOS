// const Handlebars = require('handlebars');
// const MomentHandler = require('handlebars.moment');
//
// MomentHandler.registerHelpers(Handlebars);
//
// console.log(Handlebars.compile('{{moment utc=true}}')({}));
//
// const PDFMerge = require('pdf-merge');

/* const files = [
    `${__dirname}/1.pdf`,
    `${__dirname}/2.pdf`,
];*/

// Save as new file
// PDFMerge(files, { output: `${__dirname}/3.pdf` })
// .then((buffer) => {});

const HandleAPI = require('./build/modules/3rdparty/handle/api');

HandleAPI.add_handle('TEST', 'https://archined.ined.fr').then((res) => { console.log(res); }).catch((err) => { console.error(err); });
