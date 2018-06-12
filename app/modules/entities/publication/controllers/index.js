// @flow
const Utils = require('../../../utils/utils');
const Config = require('../../../../config');
const MailerUtils = require('../../../utils/mailer');
const Handlebars = require('../../../utils/templating');
const EntitiesUtils = require('../../../utils/entities');
const Logger = require('../../../../logger');

module.exports = {};

async function post_action(publication: Object, options: Object) {
    let unsent_messages = Utils.find_value_with_path(publication.source, 'system.emails'.split('.'));

    if (unsent_messages) {
        unsent_messages = unsent_messages.filter(um => !um.sent);
    }

    if (unsent_messages.length === 0) {
        return;
    }

    const d = publication.source.depositor;

    if (!d) {
        return;
    }

    const depositor = await EntitiesUtils.retrieve_and_get_source('user', d);

    if (!depositor) {
        return;
    }

    const emails = Utils.find_value_with_path(depositor, 'emails'.split('.'));
    if (!emails) {
        return;
    }

    let master = emails.find(elt => elt.is_master);

    if (master && emails.length > 0) {
        master = emails[0];
    }

    const templates = await EntitiesUtils.search_and_get_sources('mail_template', {
        $where:
        {
            $and: [
                { 'trigger.entity': 'publication' },
                { 'trigger.matches.key': 'status' },
                { 'trigger.matches.value': publication.status },
            ],
        },
    });

    if (templates.length === 0) {
        return;
    }

    const email_config = await MailerUtils.get_email_config();

    if (!email_config) {
        return;
    }

    const default_sender = email_config.default_sender || Config.email.default_sender;

    const template = templates[0];
    const sent_messages = unsent_messages.map((msg) => {
        const subject = Handlebars.compile(template.subject)({ user: depositor,
            publication: publication.source,
            message: msg.body });
        const body = Handlebars.compile(template.body)({ user: depositor,
            publication: publication.source,
            message: msg.body });
        return MailerUtils.send_email_with(default_sender, master.email, subject, body);
    });

    try {
        await Promise.all(sent_messages);
    } catch (err) {
        Logger.error(err);
    }

    publication.source.system.emails = publication.source.system.emails.map((msg) => {
        msg.sent = true;
        return msg;
    });

    await publication.update();
}

module.exports.post_action = post_action;
