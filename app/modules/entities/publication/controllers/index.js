// @flow
const Utils = require('../../../utils/utils');
const EntitiesUtils = require('../../../utils/entities');

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

    console.log(depositor);

    const emails = Utils.find_value_with_path(depositor, 'emails'.split('.'));
    if (!emails) {
        return;
    }

    let master = emails.find(elt => elt.is_master);

    if (master && emails.length > 0) {
        master = emails[0];
    }

    const template = await EntitiesUtils.search_and_get_sources('mail_template', {
        $where: [
            { 'trigger.entity': 'publication' },
            { 'trigger.matches.key': 'status' },
            { 'trigger.matches.value': 'pending' },
        ],
    });
}

module.exports.post_action = post_action;
