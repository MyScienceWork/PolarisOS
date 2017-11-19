// @flow
const ODM = require('../crud/odm');
const Model = require('./models/journals');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class Journal extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_journal`;
    }

    static type(): string {
        return 'journal';
    }
}

module.exports = Journal;
