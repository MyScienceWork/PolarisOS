const user = require('./user');
const field = require('./field');
const lang = require('./lang');
const typology = require('./typology');
const config = require('./config');

module.exports = {
    user: user.msw,
    field: field.msw,
    lang: lang.msw,
    typology: typology.msw,
    config: config.msw,
};
