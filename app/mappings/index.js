const user = require('./user');
const role = require('./role');
const identifier = require('./identifier');

const entity = require('./entity');
const pipeline = require('./pipeline');
const pfunction = require('./function');
const form = require('./form');

const lang = require('./lang');
const config = require('./config');
const mail_template = require('./mail_template');
const chart = require('./chart');

const widget = require('./widget');
const menu = require('./menu');
const template = require('./template');
const page = require('./page');

const importer = require('./importer');
const exporter = require('./exporter');
const connector = require('./connector');
const query = require('./query');

const publication = require('./publication');
const mswpublication = require('./mswpublication');

const tracking_stat = require('./tracking_stat');
const system_report = require('./system_report');

const workflow = require('./workflow');
const action = require('./action');
const cache = require('./cache');

module.exports = {
    user: user.msw,
    role: role.msw,
    identifier: identifier.msw,

    form: form.msw,
    entity: entity.msw,
    pipeline: pipeline.msw,
    function: pfunction.msw,

    lang: lang.msw,
    config: config.msw,
    mail_template: mail_template.msw,
    chart: chart.msw,

    widget: widget.msw,
    menu: menu.msw,
    template: template.msw,
    page: page.msw,

    importer: importer.msw,
    exporter: exporter.msw,
    connector: connector.msw,
    query: query.msw,

    publication: publication.msw,
    mswpublication: mswpublication.msw,

    tracking_stat: tracking_stat.msw,
    system_report: system_report.msw,

    workflow: workflow.msw,
    cache: cache.msw,
    action: action.msw,
};
