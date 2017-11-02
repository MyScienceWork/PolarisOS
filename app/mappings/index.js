const user = require('./user');
const form = require('./form');
const lang = require('./lang');
const typology = require('./typology');
const config = require('./config');
const datatemplate = require('./datatemplate');

module.exports = {
    user: user.msw,
    form: form.msw,
    lang: lang.msw,
    typology: typology.msw,
    config: config.msw,
    datatemplate: datatemplate.msw,
};
