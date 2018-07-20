// @flow
const Mime = require('mime');
const _ = require('lodash');
const Utils = require('../../../utils/utils');
const Config = require('../../../../config');
const MailerUtils = require('../../../utils/mailer');
const ConfigUtils = require('../../../utils/config');
const LangUtils = require('../../../utils/lang');
const Handlebars = require('../../../utils/templating');
const EntitiesUtils = require('../../../utils/entities');
const Logger = require('../../../../logger');
const Errors = require('../../../exceptions/errors');

module.exports = {};

async function send_emails_to_depositor(publication: Object, options: Object) {
    let unsent_messages = Utils.find_value_with_path(publication.source, 'system.emails'.split('.'));
    if (unsent_messages) {
        unsent_messages = unsent_messages.filter(um => !um.sent);
    }

    if (unsent_messages.length === 0) {
        return publication;
    }

    const d = publication.source.depositor;

    if (!d) {
        return publication;
    }

    const depositor = await EntitiesUtils.retrieve_and_get_source('user', d);

    if (!depositor) {
        return publication;
    }

    const emails = Utils.find_value_with_path(depositor, 'emails'.split('.'));
    if (!emails) {
        return publication;
    }

    let master = emails.find(elt => elt.is_master);

    if (!master && emails.length > 0) {
        master = emails[0];
    }

    const templates = await EntitiesUtils.search_and_get_sources('mail_template', {
        where:
        {
            id: 'review-publication',
        /* $and: [
                { 'trigger.entity': 'publication' },
                { 'trigger.matches.key': 'status' },
                { 'trigger.matches.value': publication.status },
                ],*/
        },
    });
    if (templates.length === 0) {
        return publication;
    }


    const email_config = await MailerUtils.get_email_config();

    if (!email_config) {
        return publication;
    }

    const default_sender = email_config.default_sender || Config.email.default_sender;

    const template = templates[0];
    const sent_messages = unsent_messages.map(async (msg) => {
        const lang = depositor.preferred_language || 'EN';
        const info_subject = Handlebars.compile(template.subject)({ user: depositor,
            publication: publication.source,
            message: msg.body });
        const info_body = Handlebars.compile(template.body)({ user: depositor,
            publication: publication.source,
            message: msg.body });
        const subject = await LangUtils.strings_to_translation(info_subject, lang);
        const body = await LangUtils.strings_to_translation(info_body, lang);
        return await MailerUtils.send_email_with(default_sender, master.email, subject, body);
    });

    Promise.all(sent_messages).then(() => {}).catch(err => Logger.error(err));
    publication._db.source.system.emails = publication._db.source.system.emails.map((msg) => {
        msg.sent = true;
        return msg;
    });

    return publication;
}

async function send_emails_to_reviewer(publication: Object, options: Object) {
    const messages = Utils.find_value_with_path(publication.source, 'system.emails'.split('.')) || [];
    if (messages.length === 0) {
        return publication;
    }

    const d = messages[0].reviewer;
    if (!d) {
        return publication;
    }

    const reviewer = await EntitiesUtils.retrieve_and_get_source('user', d);

    if (!reviewer) {
        return publication;
    }

    const emails = Utils.find_value_with_path(reviewer, 'emails'.split('.'));
    if (!emails) {
        return publication;
    }

    let master = emails.find(elt => elt.is_master);

    if (!master && emails.length > 0) {
        master = emails[0];
    }

    const templates = await EntitiesUtils.search_and_get_sources('mail_template', {
        where:
        {
            id: 'depositor-modify-publication',
        },
    });
    if (templates.length === 0) {
        return publication;
    }


    const email_config = await MailerUtils.get_email_config();

    if (!email_config) {
        return publication;
    }

    const default_sender = email_config.default_sender || Config.email.default_sender;

    const template = templates[0];
    const lang = reviewer.preferred_language || 'EN';
    const info_subject = Handlebars.compile(template.subject)({ user: reviewer,
        publication: publication.source,
    });
    const info_body = Handlebars.compile(template.body)({ user: reviewer,
        publication: publication.source,
    });
    const subject = await LangUtils.strings_to_translation(info_subject, lang);
    const body = await LangUtils.strings_to_translation(info_body, lang);

    const promise = MailerUtils.send_email_with(default_sender, master.email, subject, body);
    promise.then(() => {}).catch(err => Logger.error(err));
    return publication;
}

function send_emails(publication: Object, options: Object) {
    const md = options.__md;
    const papi = md.papi;

    if (publication.source.reviewer) {
        return send_emails_to_depositor(publication, options);
    } else if (publication.source.system.emails && publication.source.system.emails.length > 0) {
        console.log('papi', papi);
        if (papi._id === publication.source.depositor || publication.source.contributors.find(c => c.label === papi.author)) {
            return send_emails_to_reviewer(publication, options);
        }
    }
    return publication;
}

async function post_action(publication: Object, options: Object) {
    publication = await send_emails(publication, options);
    await EntitiesUtils.update(publication.source, 'publication');
    return publication;
}

async function request_copy(ctx: Object): Promise<any> {
    const body = ctx.request.body;
    console.log(body);

    const email_config = await MailerUtils.get_email_config();
    if (!email_config) {
        ctx.body = {};
        return;
    }

    const id = body.item;
    const request = { email: body.email, firstname: body.firstname, lastname: body.lastname };
    const publication = await EntitiesUtils.retrieve_and_get_source('publication', id);
    if (!publication) {
        ctx.body = {};
        return;
    }

    const templates = await EntitiesUtils.search_and_get_sources('mail_template', {
        where: {
            id: 'copy-request',
        },
        size: 1,
    });

    if (templates.length === 0) {
        ctx.body = {};
        return;
    }

    const template = templates[0];

    const recipients = await EntitiesUtils.search_and_get_sources('user', {
        where: {
            $or: [
                { _id: publication.depositor },
                { author: publication.contributors.map(c => c.label) },
            ],
        },
    });

    if (recipients.length === 0) {
        ctx.body = {};
        return;
    }


    const promises = recipients.map(async (recipient) => {
        const lang = recipient.preferred_language || 'EN';
        const template_subject = await LangUtils.strings_to_translation(template.subject, lang);
        const template_content = await LangUtils.strings_to_translation(template.body, lang);
        const subject = Handlebars.compile(template_subject)({ publication, request, user: recipient });
        const content = Handlebars.compile(template_content)({ publication, request, user: recipient });
        const email = recipient.emails.find(e => e.is_master) || recipient.emails[0];
        const sender = email_config.default_sender;
        const r = await MailerUtils.send_email_with(sender, email.email, subject, content);
        return r;
    });

    Promise.all(promises).then(() => {

    }).catch((err) => {
        Logger.error('Error when sending copy request mails');
        Logger.error(err);
    });
    ctx.body = {};
}

module.exports.post_action = post_action;
module.exports.request_copy = request_copy;
