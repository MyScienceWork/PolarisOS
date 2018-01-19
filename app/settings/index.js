const user = require('./user');
const role = require('./role');

const form = require('./form');
const entity = require('./entity');
const pipeline = require('./pipeline');
const pfunction = require('./function');

const lang = require('./lang');
const config = require('./config');

const widget = require('./widget');
const menu = require('./menu');
const template = require('./template');
const page = require('./page');

const importer = require('./importer');
const exporter = require('./exporter');
const connector = require('./connector');

module.exports = {
    user: user.msw,
    role: role.msw,

    form: form.msw,
    entity: entity.msw,
    pipeline: pipeline.msw,
    function: pfunction.msw,

    lang: lang.msw,
    config: config.msw,

    widget: widget.msw,
    menu: menu.msw,
    template: template.msw,
    page: page.msw,

    importer: importer.msw,
    exporter: exporter.msw,
    connector: connector.msw,
};
