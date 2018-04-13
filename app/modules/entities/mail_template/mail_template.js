// @flow
const ODM = require('../crud/odm');
const Model = require('./models/mail_templates');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class MailTemplate extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_mail_template`;
    }

    static get type(): string {
        return 'mail_template';
    }
}

module.exports = MailTemplate;
