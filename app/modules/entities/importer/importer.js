// @flow
const ODM = require('../crud/odm');
const Model = require('./models/importers');
const Mapping = require('../crud/mapping');
const Config = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Importer extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config.elasticsearch.index_prefix}_importer`;
    }

    static get type(): string {
        return 'importer';
    }
}

module.exports = Importer;
