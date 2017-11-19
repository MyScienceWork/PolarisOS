// @flow
const ODM = require('../crud/odm');
const Model = require('./models/keystores');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Keystore extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_keystore`;
    }

    static type(): string {
        return 'keystore';
    }
}

module.exports = Keystore;
