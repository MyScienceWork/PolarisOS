
const XML2js = require('xml2js-parser');

function to_object(text) {
    return new Promise((resolve, reject) => {
        XML2js.parseString(text, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result);
        });
    });
}

function strip_xhtml_tags(str) {
    if (str == null || str === '') {
        return str;
    }
    const r = str.replace(/<[^>]*>/g, '');
    return r;
}

module.exports = {
    to_object,
    strip_xhtml_tags,
};
