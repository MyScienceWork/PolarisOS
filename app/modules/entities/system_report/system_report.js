// @flow
const ODM = require('../crud/odm');
const Model = require('./models/system_reports');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class SystemReport extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_system_report`;
    }

    static get type(): string {
        return 'system_report';
    }
}

module.exports = SystemReport;
