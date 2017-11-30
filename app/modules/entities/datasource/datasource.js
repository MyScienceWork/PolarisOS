// @flow
const ODM = require('../crud/odm');
const Model = require('./models/datasources');
const Mapping = require('../crud/mapping');
const Config_ = require('../../../config');

const mapping = new Mapping(Model.Mapping);

class DataSource extends ODM {
    static model(): Object {
        return Model;
    }

    static mapping(): Object {
        return mapping;
    }

    static index(): string {
        return `${Config_.elasticsearch.index_prefix}_datasource`;
    }

    static type(): string {
        return 'datasource';
    }
}

module.exports = DataSource;
