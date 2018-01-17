const user = require('./user');
const role = require('./role');

const entity = require('./entity');
const pipeline = require('./pipeline');
const pfunction = require('./function');
const form = require('./form');

const lang = require('./lang');
const config = require('./config');

const widget = require('./widget');
const menu = require('./menu');
const template = require('./template');
const page = require('./page');

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
};
