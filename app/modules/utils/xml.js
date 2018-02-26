
const XML2js = require('xml2js');

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

module.exports = {
    to_object,
};
