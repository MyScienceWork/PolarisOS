const _ = require('lodash');
const Nodemailer = require('nodemailer');
const EntitiesUtils = require('./entities');

const env = process.env.NODE_ENV || 'development';

async function get_smtp_transport() {
    const configs = await EntitiesUtils.search_and_get_sources('config', {
        where: {
            environment: env,
        },
        size: 1,
    });

    if (configs.length === 0) {
        return null;
    }

    const config = configs[0];

    if (!('mail' in config) || !('smtp' in config.mail)) {
        return null;
    }

    const smtp = config.mail.smtp;

    if (!smtp.host || !smtp.port || !smtp.auth || !smtp.auth.user) {
        return null;
    }

    const transporter = Nodemailer.createTransport({
        host: smtp.host,
        port: parseInt(smtp.port, 10),
        secure: smtp.secure || false,
        auth: {
            user: smtp.auth.user,
            pass: smtp.auth.pass,
        },
    });
    return transporter;
}

async function send_email_through_smtp(options) {
    const transporter = await get_smtp_transport();
    if (transporter == null) {
        return null;
    }
    const info = await transporter.sendMail(options);
    return info;
}

function send_email(options, transport = 'smtp') {
    switch (transport) {
    default:
    case 'smtp': {
        return send_email_through_smtp(options);
    }
    }
}

function send_email_with(from, to, subject, msg, options = {}, transport = 'smtp') {
    const all_options = _.merge({}, options, {
        from, to, subject, text: msg, html: msg,
    });
    return send_email(all_options, transport);
}

module.exports = {
    send_email,
    send_email_with,
    get_smtp_transport,
};
