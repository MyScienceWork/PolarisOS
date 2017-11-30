// @flow
const ODM = require('../crud/odm');
const Model = require('./models/entities');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class _Entity extends ODM {
    static get model(): Object {
        return Model;
    }

    static get mapping(): Object {
        return mapping;
    }

    static get index(): string {
        return `${Config_.elasticsearch.index_prefix}_entity`;
    }

    static get type(): string {
        return 'entity';
    }
}

module.exports = _Entity;
