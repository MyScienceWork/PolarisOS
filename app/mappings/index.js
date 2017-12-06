const user = require('./user');
const form = require('./form');
const lang = require('./lang');
const typology = require('./typology');
const config = require('./config');
const datatemplate = require('./datatemplate');
const widget = require('./widget');
const menu = require('./menu');
const langref = require('./langref');
const journal = require('./journal');
const keystore = require('./keystore');
const datainstance = require('./datainstance');
const entity = require('./entity');
const pipeline = require('./pipeline');
const pfunction = require('./function');

module.exports = {
    user: user.msw,
    form: form.msw,
    lang: lang.msw,
    langref: langref.msw,
    typology: typology.msw,
    config: config.msw,
    datatemplate: datatemplate.msw,
    widget: widget.msw,
    menu: menu.msw,
    journal: journal.msw,
    keystore: keystore.msw,
    datainstance: datainstance.msw,
    entity: entity.msw,
    pipeline: pipeline.msw,
    function: pfunction.msw,
};
