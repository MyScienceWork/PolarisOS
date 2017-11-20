// @flow
const ODM = require('../crud/odm');
const Model = require('./models/datainstances');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class DataInstance extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_datainstance`;
    }

    static type(): string {
        return 'datainstance';
    }
}

module.exports = DataInstance;
