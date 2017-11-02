// @flow
const ODM = require('../crud/odm');
const Model = require('./models/configs');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class DataTemplate extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_datatemplate`;
    }

    static type(): string {
        return 'datatemplate';
    }
}

module.exports = DataTemplate;
