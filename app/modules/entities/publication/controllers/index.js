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

async function send_emails(publication: Object, options: Object) {
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
        return publication;
    }

    const email_config = await MailerUtils.get_email_config();

    if (!email_config) {
        return publication;
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

    return publication;
}

async function generate_cover_page(publication: Object, options: Object) {
    const files = Utils.find_value_with_path(publication, 'files'.split('.')) || [];
    if (files.length === 0) {
        return publication;
    }

    const master = files.find(f => f.is_master) || files[0];
    const is_pdf = Mime.getType(master.url) === 'application/pdf';

    if (!is_pdf) {
        return publication;
    }

    const myconfig = await ConfigUtils.get_config();

    if (!myconfig) {
        return publication;
    }

    const cover_page = Utils.find_value_with_path(myconfig, 'gui.cover_page'.split('.'));
    if (!cover_page) {
        return publication;
    }

    const base_url = myconfig.base_url;
    const compiled = Handlebars.compile(cover_page)(_.merge({ url: `${base_url}/view/${publication._id}`, link: `${base_url}/view/${publication._id}` }, publication));
    console.log(compiled);
    return publication;
}

async function post_action(publication: Object, options: Object) {
    // publication = await send_emails(publication, options);
    // publication = await generate_cover_page(publication, options);
    // await publication.update();
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

    const lang = ctx.__md ? ctx.__md.lang : 'EN';
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


    template.subject = await LangUtils.strings_to_translation(template.subject, lang);
    template.body = await LangUtils.strings_to_translation(template.body, lang);


    const promises = recipients.map((recipient) => {
        const subject = Handlebars.compile(template.subject)({ publication, request, user: recipient });
        const content = Handlebars.compile(template.body)({ publication, request, user: recipient });
        const email = recipient.emails.find(e => e.is_master) || recipient.emails[0];
        const sender = email_config.default_sender;
        return MailerUtils.send_email_with(sender, email.email, subject, content);
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
