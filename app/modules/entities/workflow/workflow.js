// @flow
const ODM = require('../crud/odm');
const Model = require('./models/workflows');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Workflow extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_workflow`;
    }

    static get type(): string {
        return 'workflow';
    }
}

module.exports = Workflow;
